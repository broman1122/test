"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Plus, Minus, Trash2, Phone, Check, Pizza, Beef, Drumstick, Fish, Utensils, Sparkles, Sandwich, X } from "lucide-react"
import { menuData } from "@/lib/menu-data"

// Restaurant phone number
const PHONE_NUMBER = "0722-562660"
const SWISH_NUMBER = "1234567890"
const SWISH_PAYEE_ALIAS = "restaurant-payee"

const categoryIcons: Record<string, React.ReactNode> = {
  "vardagspizzor": <Pizza className="w-5 h-5" />,
  "tacos-mexicana": <Beef className="w-5 h-5" />,
  "kycklingpizzor": <Drumstick className="w-5 h-5" />,
  "fisk-skaldjur": <Fish className="w-5 h-5" />,
  "kebab-special": <Utensils className="w-5 h-5" />,
  "lyxpizzor": <Sparkles className="w-5 h-5" />,
  "rullar-tallrikar": <Utensils className="w-5 h-5" />,
  "burgare": <Sandwich className="w-5 h-5" />,
  "shawarma": <Utensils className="w-5 h-5" />,
}

interface CartItem {
  id: string
  name: string
  size: string
  price: number
  quantity: number
  extras: string[]
}

interface SelectedItem {
  id: string
  name: string
  description: string
  priceEn: number
  priceFamilj?: number
  category: string
}

interface OrderConfirmation {
  success: boolean
  orderNumber?: string
  customerName?: string
  items?: CartItem[]
  totalAmount?: number
  paymentMethod?: string
  message?: string
}

export function OrderSection() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState(menuData[0]?.id || "")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<OrderConfirmation | null>(null)
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<"standard" | "familj" | "barn" | "glutenfri" | "dubbel">("standard")
  const [includedToppings, setIncludedToppings] = useState<string[]>([])

  const isPizzaCategory = ["vardagspizzor", "tacos-mexicana", "kycklingpizzor", "fisk-skaldjur", "kebab-special", "lyxpizzor"].includes(selectedCategory)

  const openItemModal = (item: typeof menuData[0]["items"][0]) => {
    setSelectedItem(item)
    setModalQuantity(1)
    setSelectedSize("standard")
    // Parse description for included toppings
    const toppings = item.description.split(", ").map(t => t.trim())
    setIncludedToppings(toppings)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setModalQuantity(1)
    setSelectedSize("standard")
    setIncludedToppings([])
  }

  const calculatePrice = () => {
    if (!selectedItem) return 0
    let basePrice = selectedItem.priceEn
    
    switch (selectedSize) {
      case "familj":
        basePrice = selectedItem.priceFamilj || selectedItem.priceEn + 150
        break
      case "barn":
        basePrice = selectedItem.priceEn - 10
        break
      case "glutenfri":
        basePrice = selectedItem.priceEn + 25
        break
      case "dubbel":
        basePrice = selectedItem.priceEn + 10
        break
      default:
        basePrice = selectedItem.priceEn
    }
    
    return basePrice * modalQuantity
  }

  const getSizeLabel = () => {
    switch (selectedSize) {
      case "familj": return "Familj"
      case "barn": return "Barn"
      case "glutenfri": return "Glutenfri"
      case "dubbel": return "Dubbel botten"
      default: return "Standard"
    }
  }

  const addToCartFromModal = () => {
    if (!selectedItem) return

    let unitPrice = selectedItem.priceEn
    switch (selectedSize) {
      case "familj":
        unitPrice = selectedItem.priceFamilj || selectedItem.priceEn + 150
        break
      case "barn":
        unitPrice = selectedItem.priceEn - 10
        break
      case "glutenfri":
        unitPrice = selectedItem.priceEn + 25
        break
      case "dubbel":
        unitPrice = selectedItem.priceEn + 10
        break
    }

    const cartId = `${selectedItem.id}-${selectedSize}-${Date.now()}`
    
    setCart(prev => [...prev, {
      id: cartId,
      name: selectedItem.name,
      size: getSizeLabel(),
      price: unitPrice,
      quantity: modalQuantity,
      extras: includedToppings,
    }])
    
    closeModal()
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : item
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // This function is no longer used since we direct customers to call instead
  // Keeping a simplified version for potential future use
  const handleSubmit = async () => {
    if (!customerName || !customerPhone || cart.length === 0) {
      alert("Vänligen fyll i namn, telefon och lägg till minst en vara")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          items: cart.map(item => ({
            name: `${item.name} (${item.size})`,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount,
          paymentMethod: "telefon",
          notes
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setOrderResult({ 
          success: true, 
          orderNumber: data.orderNumber,
          customerName,
          items: [...cart],
          totalAmount,
          paymentMethod: "telefon",
          message: `Ring ${PHONE_NUMBER} för att beställa. Betala när du hämtar.`
        })
        setCart([])
        setCustomerName("")
        setCustomerPhone("")
        setNotes("")
      } else {
        setOrderResult({ success: false, message: data.error || "Något gick fel" })
      }
    } catch {
      setOrderResult({ success: false, message: "Kunde inte skicka beställning" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Order confirmation view
  if (orderResult?.success) {
    return (
      <section id="meny" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-full overflow-hidden">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Tack för din beställning!</h2>
                <p className="text-5xl font-bold text-primary my-4">#{orderResult.orderNumber}</p>
                <p className="text-lg text-muted-foreground">Beställare: <span className="font-semibold text-foreground">{orderResult.customerName}</span></p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Din beställning
                </h3>
                <div className="space-y-3">
                  {orderResult.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <div>
                        <span className="font-medium text-foreground">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({item.size})</span>
                        <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-semibold text-foreground">{item.price * item.quantity} kr</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-primary">
                  <span className="text-xl font-bold text-foreground">Totalt:</span>
                  <span className="text-2xl font-bold text-primary">{orderResult.totalAmount} kr</span>
                </div>
              </div>

              <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-primary text-lg">Ring oss för att beställa</h3>
                </div>
                <p className="text-foreground mb-4">
                  Ring numret nedan och berätta din beställning. Betala när du hämtar.
                </p>
                <a 
                  href="tel:0722562660"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Ring: {PHONE_NUMBER}
                </a>
              </div>

              <Button 
                onClick={() => setOrderResult(null)} 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
              >
                Gör en ny beställning
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const currentCategory = menuData.find(cat => cat.id === selectedCategory)

  return (
    <section id="meny" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-full overflow-hidden relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-medium">Vår Meny</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-serif">
            Upptack vara smaker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Njut av handgjorda pizzor, saftiga burgare och autentiska ratter - allt tillagat med karlek och de farskaste ingredienserna.
          </p>
          <a href="tel:0722562660">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-full px-10 py-7 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1">
              <Phone className="w-5 h-5" />
              Ring for bestalla
            </Button>
          </a>
        </div>

        {/* Category tabs - Styled as pills */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
                    : "bg-card hover:bg-muted border border-border text-foreground hover:border-primary/30"
                }`}
              >
                {categoryIcons[category.id]}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Menu Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                {categoryIcons[selectedCategory]}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{currentCategory?.name}</h3>
                <p className="text-muted-foreground text-sm">{currentCategory?.items.length} ratter</p>
              </div>
            </div>

            {/* Menu items - Beautiful cards */}
            <div className="grid gap-4">
              {currentCategory?.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer menu-card-hover"
                  onClick={() => openItemModal(item)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                        <div className="flex gap-1.5 flex-wrap">
                          {item.vegetarian && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-500/10 text-green-600 px-2.5 py-1 rounded-full border border-green-500/20">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Veg
                            </span>
                          )}
                          {item.spicy && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium bg-red-500/10 text-red-600 px-2.5 py-1 rounded-full border border-red-500/20">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              Stark
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{item.priceEn} kr</div>
                        {item.priceFamilj && (
                          <div className="text-xs text-muted-foreground">Familj {item.priceFamilj} kr</div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          openItemModal(item)
                        }}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-4 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Valj
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Checkout */}
          <div className="space-y-6">
            {/* Cart */}
            <div className="sticky top-24 bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Din varukorg</h3>
                    <p className="text-xs text-muted-foreground">
                      {cart.length === 0 ? "Tom" : `${cart.reduce((sum, item) => sum + item.quantity, 0)} produkter`}
                    </p>
                  </div>
                  {cart.length > 0 && (
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Varukorgen ar tom</p>
                    <p className="text-xs text-muted-foreground mt-1">Lagg till nagot gott fran menyn</p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="max-h-[280px]">
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.id} className="bg-muted/30 rounded-xl p-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-foreground truncate">{item.name}</p>
                                <p className="text-xs text-primary font-medium">{item.size}</p>
                              </div>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 bg-background rounded-lg p-1">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7 rounded-md"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7 rounded-md"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <span className="font-bold text-foreground">{item.price * item.quantity} kr</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-muted-foreground">Totalt</span>
                        <span className="text-2xl font-bold text-primary">{totalAmount} kr</span>
                      </div>
                      <a href="tel:0722562660" className="block">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
                          <Phone className="w-5 h-5 mr-2" />
                          Ring for bestalla
                        </Button>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Selection Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => closeModal()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div>
                <span className="text-2xl text-primary font-bold">{selectedItem?.name}</span>
                <span className="text-muted-foreground ml-2">kr</span>
              </div>
            </DialogTitle>
            <p className="text-muted-foreground text-sm">{selectedItem?.description}</p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Included toppings */}
            <div>
              <h4 className="font-bold text-foreground mb-3">Ingår</h4>
              <div className="grid grid-cols-2 gap-3">
                {includedToppings.map((topping, index) => (
                  <label 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border cursor-pointer hover:bg-muted/50"
                  >
                    <Checkbox checked={true} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <span className="text-sm text-foreground">{topping}</span>
                    <X className="w-4 h-4 text-muted-foreground ml-auto" />
                  </label>
                ))}
              </div>
            </div>

            {/* Pizza size options */}
            {isPizzaCategory && (
              <div>
                <h4 className="font-bold text-foreground mb-3">Pizzor 1</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <label 
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedSize === "glutenfri" 
                        ? "border-primary bg-primary/10" 
                        : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSize("glutenfri")}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedSize === "glutenfri" ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedSize === "glutenfri" && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <span className="text-sm text-foreground">Glutenfri botten</span>
                      <span className="text-xs text-primary ml-1">+25:-</span>
                    </div>
                  </label>

                  <label 
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedSize === "standard" 
                        ? "border-primary bg-primary/10" 
                        : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSize("standard")}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedSize === "standard" ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedSize === "standard" && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-foreground">Standard</span>
                  </label>

                  <label 
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedSize === "barn" 
                        ? "border-primary bg-primary/10" 
                        : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSize("barn")}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedSize === "barn" ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedSize === "barn" && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <span className="text-sm text-foreground">Barnpizza</span>
                      <span className="text-xs text-green-600 ml-1">-10:-</span>
                    </div>
                  </label>

                  {selectedItem?.priceFamilj && (
                    <label 
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSize === "familj" 
                          ? "border-primary bg-primary/10" 
                          : "border-border bg-muted/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedSize("familj")}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedSize === "familj" ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}>
                        {selectedSize === "familj" && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm text-foreground">Familjepizza</span>
                        <span className="text-xs text-primary ml-1">+{(selectedItem.priceFamilj - selectedItem.priceEn)} kr:-</span>
                      </div>
                    </label>
                  )}

                  <label 
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedSize === "dubbel" 
                        ? "border-primary bg-primary/10" 
                        : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSize("dubbel")}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedSize === "dubbel" ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {selectedSize === "dubbel" && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <span className="text-sm text-foreground">Dubbel botten</span>
                      <span className="text-xs text-primary ml-1">+10:-</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add button */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
              <Button 
                size="icon"
                variant="ghost"
                className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-10 text-center font-bold text-lg">{modalQuantity}</span>
              <Button 
                size="icon"
                variant="ghost"
                className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setModalQuantity(modalQuantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
              onClick={addToCartFromModal}
            >
              Lägg till {calculatePrice()} kr
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
