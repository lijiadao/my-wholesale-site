'use client';

import React, { useState } from 'react';

// 示例产品数据（实际可从 JSON 或 CMS 动态读取）
const PRODUCT = {
  title: "Premium Heavyweight Cotton Oversized Tee (B2B Wholesale)",
  sku: "TS-2026-HVY",
  moq: 50,
  priceRange: "$6.50 - $9.80 / pc",
  colors: [
    { name: "Vintage Black", hex: "#1a1a1a" },
    { name: "Oatmeal Milk", hex: "#e5e0d8" },
    { name: "Sage Green", hex: "#7a8b7b" }
  ],
  sizes: ["S", "M", "L", "XL", "2XL"],
  images: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80"
  ]
};

export default function WholesaleProductPage() {
  const [selectedImage, setSelectedImage] = useState(PRODUCT.images[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0].name);
  
  // 尺码与数量勾选状态
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    S: 10,
    M: 20,
    L: 20,
    XL: 0,
    "2XL": 0,
  });

  const handleQuantityChange = (size: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, value)
    }));
  };

  const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased">
      {/* 顶部简易 Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider uppercase">LUMINA APPAREL <span className="text-xs text-neutral-500 font-normal">WHOLESALE</span></div>
        <a 
          href="https://wa.me/1234567890?text=Hi,%20I%20am%20interested%20in%20wholesale%20apparel." 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>WhatsApp Direct</span>
        </a>
      </header>

      {/* 主体产品详情区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 左侧：图片展示区 */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200">
              <img 
                src={selectedImage} 
                alt={PRODUCT.title} 
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {PRODUCT.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 右侧：产品信息与询价参数勾选 */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-block bg-neutral-200 text-neutral-800 text-xs px-2.5 py-1 rounded font-mono mb-3">
                SKU: {PRODUCT.sku}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight mb-2">{PRODUCT.title}</h1>
              
              {/* 批发价格与 MOQ 说明 */}
              <div className="bg-neutral-100 p-4 rounded-xl mb-6 flex justify-between items-center border border-neutral-200">
                <div>
                  <span className="text-xs text-neutral-500 uppercase block tracking-wider">Estimated Wholesale Price</span>
                  <span className="text-2xl font-bold text-neutral-900">{PRODUCT.priceRange}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-500 uppercase block tracking-wider">MOQ Requirement</span>
                  <span className="text-sm font-semibold text-neutral-800">{PRODUCT.moq} pcs / order</span>
                </div>
              </div>

              {/* 颜色选择 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Color: <span className="font-bold">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {PRODUCT.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === color.name ? 'border-black scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* 尺码与拟定采购数量配比 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-neutral-700">Size & Quantity Breakdown</label>
                  <span className="text-xs text-neutral-500">Total Selected: <strong className="text-black">{totalQuantity} pcs</strong></span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {PRODUCT.sizes.map((size) => (
                    <div key={size} className="border border-neutral-200 rounded-lg p-2 text-center bg-white">
                      <span className="block text-xs font-bold text-neutral-600 mb-1">{size}</span>
                      <input 
                        type="number" 
                        min="0"
                        value={quantities[size]}
                        onChange={(e) => handleQuantityChange(size, parseInt(e.target.value) || 0)}
                        className="w-full text-center text-sm font-medium border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 表单锚点引流 & Formspree 询盘表单 */}
            <div id="inquiry-section" className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-bold mb-1">Get an Instant Factory Quote</h3>
              <p className="text-xs text-neutral-500 mb-4">Submit your specs, custom tech packs, or size requirements below. We reply within 2 hours.</p>
              
              {/* Formspree 表单集成 */}
              <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="space-y-3">
                {/* 隐藏域：自动透传用户勾选的款式参数 */}
                <input type="hidden" name="Product_SKU" value={PRODUCT.sku} />
                <input type="hidden" name="Selected_Color" value={selectedColor} />
                <input type="hidden" name="Selected_Quantities" value={JSON.stringify(quantities)} />
                <input type="hidden" name="Total_Pcs" value={totalQuantity} />

                <div>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Your Business Email *" 
                    className="w-full text-sm px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="whatsapp_or_phone" 
                    placeholder="WhatsApp / Phone Number (Optional)" 
                    className="w-full text-sm px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <textarea 
                    name="message" 
                    rows={3} 
                    placeholder="Additional custom requirements (e.g., Logo print, Custom tags, Shipping address)..." 
                    className="w-full text-sm px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3 rounded-lg text-sm transition-colors shadow-md"
                >
                  Inquire Now ({totalQuantity} pcs)
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      {/* 底部悬浮 WhatsApp 快速联系 (移动端优先) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={`https://wa.me/1234567890?text=Hi, I want a quote for SKU: ${PRODUCT.sku}, Color: ${selectedColor}, Total Pcs: ${totalQuantity}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
