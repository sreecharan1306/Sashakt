"use client"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function About() {
  const { ref: visionRef, isVisible: visionVisible } = useScrollAnimation()
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation()

  const teamMembers = [
    { name: "Sree Charan Reddy M", image: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", role: "Lead Developer" },
    { name: "Lalith Srinandan", image: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", role: "UI/UX Designer" },
    { name: "Sudheep Aavula", image: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", role: "Backend Engineer" },
    { name: "Vardaan Bhatia", image: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg", role: "Product Manager" },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 hero-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            ref={visionRef}
            className={`bg-black/40 dark:bg-black/60 backdrop-blur rounded-3xl p-8 md:p-12 transition-all duration-1000 ${
              visionVisible ? "fade-in-up" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 dark:text-blue-300 mb-8 text-center fade-in-down">
              Our Vision
            </h2>
            <p className="text-white dark:text-gray-100 text-lg md:text-xl leading-relaxed mb-6">
              Our journey began with a vision to make knowledge about children's rights accessible and enjoyable for
              young minds. The initiative is a response to the recognized need for early understanding of children's
              rights. We are committed to breaking down barriers and creating a platform that transcends socio-economic
              constraints.
            </p>

            <h2
              className="text-4xl md:text-5xl font-bold text-blue-400 dark:text-blue-300 mb-8 mt-12 text-center fade-in-down"
              style={{ animationDelay: "0.2s" }}
            >
              Meet the Team
            </h2>
            <p className="text-white dark:text-gray-100 text-lg md:text-xl leading-relaxed mb-12">
              Behind this transformative platform is a dedicated team of HexaHeroes. Our diverse skills converge to
              craft an innovative space where learning about Child Rights becomes an exciting adventure. Together, we
              strive to redefine how awareness about Child Rights is imparted, paving the way for a more informed and
              empowered future.
            </p>

            <div ref={teamRef} className="grid grid-cols-2 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`flex flex-col items-center team-member-card ${teamVisible ? "fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-400 dark:border-blue-300 overflow-hidden mb-4 transform transition-transform hover:scale-110 hover:shadow-lg">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white dark:text-gray-100 text-sm md:text-lg font-semibold text-center hover:text-blue-300 transition-colors">
                    {member.name}
                  </p>
                  <p className="text-blue-300 dark:text-blue-200 text-xs md:text-sm text-center mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
