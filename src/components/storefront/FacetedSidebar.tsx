"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

const CERTIFICATIONS = ["FDA", "Helal", "ISO", "Organik"]
const DIET_LABELS = ["Glutensiz", "Vegan", "Şekersiz"]
const MOQ_OPTIONS = ["Tümü", "1-10", "11-50", "51-100", "100+"]

export default function FacetedSidebar() {
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [selectedMoq, setSelectedMoq] = useState("Tümü")
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])
  const [selectedDiets, setSelectedDiets] = useState<string[]>([])

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    )
  }

  const toggleDiet = (diet: string) => {
    setSelectedDiets(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    )
  }

  const handleApplyFilters = () => {
    console.log({ priceMin, priceMax, selectedMoq, selectedCerts, selectedDiets })
    // TODO: Update URL search params and push router
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtreler</h3>
      </div>

      {/* Fiyat Aralığı */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Fiyat Aralığı (₺)</h4>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <span className="text-gray-400">-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Minimum Sipariş Miktarı (MOQ) */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Min. Sipariş (MOQ)</h4>
        <div className="relative">
          <select 
            value={selectedMoq}
            onChange={(e) => setSelectedMoq(e.target.value)}
            className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            {MOQ_OPTIONS.map(moq => (
              <option key={moq} value={moq}>{moq}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Sertifikalar */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Sertifikalar</h4>
        <div className="space-y-2">
          {CERTIFICATIONS.map(cert => (
            <label key={cert} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCerts.includes(cert) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {selectedCerts.includes(cert) && <Check className="h-3 w-3 text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={selectedCerts.includes(cert)}
                onChange={() => toggleCert(cert)}
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Diyet & Etiketler */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Diyet & Etiketler</h4>
        <div className="space-y-2">
          {DIET_LABELS.map(diet => (
            <label key={diet} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedDiets.includes(diet) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {selectedDiets.includes(diet) && <Check className="h-3 w-3 text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={selectedDiets.includes(diet)}
                onChange={() => toggleDiet(diet)}
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleApplyFilters}
        className="w-full mt-6 py-2 px-4 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        Filtreleri Uygula
      </button>
    </div>
  )
}
