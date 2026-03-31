import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import badgeNavy from '../assets/badge-navy.svg'
import courtAerial from '../assets/court-aerial.png'

export default function SignupForm() {
  const [ref, controls] = useScrollReveal(0.1)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [focused, setFocused] = useState(null)

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzr-UX_Ix6Y9NI6BkCmTz6S7Dy1cWHZ6JJVGmrmBS8-85kMIUEnPEtPIRtYKryblNEj/exec'

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        body: JSON.stringify(form),
      })
    } catch {
      // Salva mesmo se houver erro de CORS (o Apps Script recebe a request)
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  const fields = [
    { id: 'nome', label: 'Nome', type: 'text', placeholder: 'Seu nome completo' },
    { id: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '(00) 00000-0000' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com' },
  ]

  return (
    <section id="admissao" className="relative overflow-hidden" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Image side */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { duration: 1.2 } } }}
        >
          <img
            src={courtAerial}
            alt="Sette Racket Club quadra de saibro vista aérea"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warm/20" />
          <div className="absolute inset-0 bg-navy/30" />
        </motion.div>

        {/* Form side */}
        <div className="py-28 sm:py-40 px-6 sm:px-12 lg:px-20 bg-warm flex items-center">
          <motion.div className="max-w-md mx-auto w-full"
            initial={{ opacity: 0, y: 40 }} animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } } }}>

            <span className="inline-block text-[0.6rem] tracking-ultra-wide uppercase text-terracotta font-light font-body mb-10">
              Processo de adesão
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-navy">Candidate-se a membro</h2>
            <div className="my-8 w-10 h-[2px] bg-terracotta/40" />
            <p className="text-sm text-stone font-light leading-relaxed mb-12 font-body">
              O acesso ao Sette Racket Club acontece por meio de um processo seletivo e requer investimento inicial para adesão como membro. Preencha o formulário e receba atualizações em primeira mão.
            </p>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="py-12 text-center">
                <img src={badgeNavy} alt="Sette" className="w-20 h-20 mx-auto mb-8 opacity-60" />
                <p className="font-display text-2xl sm:text-3xl font-light italic text-navy">Recebemos sua solicitação.</p>
                <p className="mt-4 text-sm text-stone font-light font-body">Entraremos em contato em breve.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {fields.map((f) => (
                  <div key={f.id} className="relative">
                    <label htmlFor={f.id}
                      className={`block text-[0.6rem] tracking-ultra-wide uppercase font-light font-body mb-2 transition-colors duration-300 ${focused === f.id ? 'text-terracotta' : 'text-stone'}`}>
                      {f.label}
                    </label>
                    <input type={f.type} id={f.id} name={f.id} required value={form[f.id]} onChange={handleChange}
                      onFocus={() => setFocused(f.id)} onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border-b-2 border-sand py-3 text-sm text-navy font-light font-body placeholder:text-stone/30 focus:outline-none focus:border-terracotta transition-colors duration-500"
                      placeholder={f.placeholder} />
                    <motion.div className="absolute bottom-0 left-0 h-[2px] bg-terracotta"
                      initial={{ width: 0 }} animate={{ width: focused === f.id ? '100%' : 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }} />
                  </div>
                ))}
                <div className="pt-8">
                  <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-12 py-4 bg-navy text-cream text-[0.65rem] sm:text-xs tracking-ultra-wide uppercase font-light font-body hover:bg-terracotta transition-all duration-500 ease-out cursor-pointer border border-navy hover:border-terracotta disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Enviando...' : 'Solicitar adesão como membro'}
                  </motion.button>
                  <p className="mt-4 text-[0.65rem] text-stone/60 font-light font-body leading-relaxed max-w-sm">
                    O clube também estará aberto ao público geral. A inscrição acima refere-se ao processo de adesão de membros.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
