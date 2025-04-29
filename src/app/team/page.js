'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function TeamPage() {
  const { t } = useLanguage();

  const teams = [
    {
      title: 'Development Team',
      members: [
        {
          name: 'Nguyen tuan',
          role: 'Lead Developer',
          image: '/team/dev1.jpg',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com'
        },
        {
          name: 'Sarah Johnson',
          role: 'Frontend Developer',
          image: '/team/dev2.jpg',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com'
        },
        {
          name: 'Michael Chen',
          role: 'Backend Developer',
          image: '/team/dev3.jpg',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com'
        }
      ]
    },
    {
      title: 'Marketing Team',
      members: [
        {
          name: 'Emily Davis',
          role: 'Marketing Lead',
          image: '/team/marketing1.jpg',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        },
        {
          name: 'David Wilson',
          role: 'Content Strategist',
          image: '/team/marketing2.jpg',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        }
      ]
    },
    {
      title: 'Testing Team',
      members: [
        {
          name: 'Lisa Anderson',
          role: 'QA Lead',
          image: '/team/test1.jpg',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com'
        },
        {
          name: 'Tom Brown',
          role: 'QA Engineer',
          image: '/team/test2.jpg',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com'
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
          Our Team
        </h1>
        
        <div className="space-y-16">
          {teams.map((team, teamIndex) => (
            <div key={teamIndex} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                {team.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.members.map((member, memberIndex) => (
                  <div 
                    key={memberIndex}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1 transition-all duration-300 hover:from-blue-500/20 hover:to-purple-500/20"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-900 p-6">
                      {/* Top Gradient Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
                      
                      {/* Profile Image */}
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Member Info */}
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                          {member.name}
                        </h3>
                        <p className="text-gray-400 mb-4">{member.role}</p>
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex justify-center space-x-4">
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" 
                             className="text-gray-400 hover:text-blue-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                            </svg>
                          </a>
                        )}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                             className="text-gray-400 hover:text-blue-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" 
                             className="text-gray-400 hover:text-blue-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 