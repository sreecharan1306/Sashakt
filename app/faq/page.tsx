"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useRouter } from "next/navigation"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { ref, isVisible } = useScrollAnimation()
  const router = useRouter()

  const faqs = [
    {
      question: "How can my child benefit from using Sashakt?",
      answer:
        "Sashakt helps children understand their rights through engaging, age-appropriate content including stories, games, and interactive activities. It builds confidence and awareness about child rights while making learning fun and enjoyable.",
      emoji: "🎓",
      category: "Learning",
    },
    {
      question: "Are the games and stories age-appropriate for children?",
      answer:
        "Yes, all content on Sashakt is carefully curated by experts to ensure it is age-appropriate and engaging for children. We regularly update our content based on feedback and best practices in child education.",
      emoji: "🎮",
      category: "Content",
    },
    {
      question: "What age range is Sashakt designed for?",
      answer:
        "Sashakt is designed for children aged 6-10 years old. We have adapted content for different age groups to ensure maximum engagement and learning outcomes.",
      emoji: "👧",
      category: "Age",
    },
    {
      question: "How can I contact support if I encounter issues?",
      answer:
        "You can reach our support team through the Contact Us page. We're available via email, phone, and social media. Our team typically responds within 24 hours.",
      emoji: "📞",
      category: "Support",
    },
    {
      question: "Can I track my child's progress and achievements?",
      answer:
        "No. Sashakt doesn't have any tracking system as of now. However, we are working on features that will allow parents to monitor their child's learning journey and celebrate their achievements.",
      emoji: "📊",
      category: "Progress",
    },
    {
      question: "What is the main goal of the child empowerment platform?",
      answer:
        "The main goal of Sashakt is to empower children by educating them about their rights, building their confidence, and creating a safe, engaging learning environment that transcends socio-economic boundaries.",
      emoji: "⭐",
      category: "Mission",
    },
    {
      question: "How is my child's data handled and protected?",
      answer:
        "We take privacy seriously. Sashakt collects minimal data and follows strict security practices to protect any information. We never share personal data with third parties without consent. For details, see our privacy policy (coming soon).",
      emoji: "🔒",
      category: "Privacy",
    },
    {
      question: "Is there parental control or moderation features?",
      answer:
        "Sashakt provides parental guidance content and easy-to-follow recommendations for supervising a child's use. We're building more moderation and parental control tools for future releases.",
      emoji: "🛡️",
      category: "Safety",
    },
    {
      question: "Are there offline or low-bandwidth options?",
      answer:
        "Some activities are designed to be printable or playable without a constant internet connection. We're working to expand offline support and optimize content for low-bandwidth environments.",
      emoji: "📥",
      category: "Access",
    },
    {
      question: "Can content be customized for my child's learning level?",
      answer:
        "Yes — activities and games are created with different difficulty levels in mind. We plan to add explicit profile-based customization so parents and teachers can tailor the experience.",
      emoji: "⚙️",
      category: "Customization",
    },
    {
      question: "Is Sashakt free to use?",
      answer:
        "Sashakt will always be free to use. We won't charge users for accessing the core content and features of the platform.",
      emoji: "💸",
      category: "Pricing",
    },
    {
      question: "How do I report inappropriate content or behavior?",
      answer:
        "If you encounter inappropriate content or behavior, please contact our support team via the Contact Us page. Include details and screenshots if possible so we can investigate quickly.",
      emoji: "🚨",
      category: "Safety",
    },
    {
      question: "How can educators or NGOs partner with Sashakt?",
      answer:
        "We welcome partnerships with educators and NGOs. Please use the Contact Us page to share partnership ideas, pilot requests, or collaboration proposals.",
      emoji: "🤝",
      category: "Partnerships",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 hero-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-block mb-4">
              <span className="text-6xl animate-bounce">❓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Got questions? We've got answers! Explore common questions from parents and students.
            </p>
          </div>

          <div className="relative mb-12 scale-in">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-2xl">🔍</div>
            <input
              type="text"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-yellow-300 border-4 border-yellow-600 rounded-2xl font-bold text-gray-800 placeholder-gray-700 focus:outline-none focus:border-yellow-700 focus:shadow-lg focus:scale-105 transform transition-all hover:shadow-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["All", "Learning", "Content", "Age", "Support", "Progress", "Mission"].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full font-semibold bg-white text-gray-800 hover:bg-blue-500 hover:text-white transition-all hover:scale-110 active:scale-95 shadow-md"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center mb-6">
            <p className="text-gray-700 font-semibold">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"} found
            </p>
          </div>

          <div ref={ref} className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden faq-item hover:shadow-xl transition-all ${
                    isVisible ? "fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-blue-100/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 text-left flex-1">
                      <span className="text-3xl group-hover:scale-125 transition-transform">{faq.emoji}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </h3>
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg
                        className={`w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-125 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </button>

                  {openIndex === index && (
                    <div className="px-6 py-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-t-4 border-blue-300 animate-in fade-in slide-in-from-top duration-300">
                      <p className="text-gray-800 leading-relaxed text-lg">{faq.answer}</p>
                      <div className="mt-4 pt-4 border-t-2 border-blue-200">
                        <button
                          onClick={() => router.push('/contact-us')}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 transition-all active:scale-95"
                        >
                          Learn More 🚀
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <p className="text-2xl mb-2">🔍</p>
                <p className="text-gray-600 font-semibold">No questions match your search. Try a different query!</p>
              </div>
            )}
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-8 text-white text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="mb-4 opacity-90">Can't find your answer? Visit our contact page or chat with Sunny!</p>
            <button
              onClick={() => router.push('/contact-us')}
              className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all active:scale-95"
            >
              Get in Touch 💬
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
