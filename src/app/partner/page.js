'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function PartnerPage() {
  const { t } = useLanguage();

  const partners = [
    {
      name: 'VNG Corporation',
      logo: 'https://graph.facebook.com/142286445825411/picture?type=large',
      description: 'Công ty công nghệ hàng đầu Việt Nam, tiên phong trong lĩnh vực trò chơi trực tuyến và nền tảng số.',
      website: 'https://www.vng.com.vn',
      partnership: 'Strategic Partner'
    },
    {
      name: 'Dino Gaming',
      logo: 'https://graph.facebook.com/102682295924140/picture?type=large',
      description: 'Nhà phát triển game và giải đấu esports chuyên nghiệp, mang đến những trải nghiệm gaming tuyệt vời.',
      website: 'https://dinogaming.vn',
      partnership: 'Technology Partner'
    },
    {
      name: 'Liên Minh Huyền Thoại Việt Nam',
      logo: 'https://graph.facebook.com/109564091848488/picture?type=large',
      description: 'Đơn vị vận hành giải đấu LMHT chuyên nghiệp tại Việt Nam, tổ chức các giải đấu VCS.',
      website: 'https://Discord.gg/lienminhhuyenthoai',
      partnership: 'Tournament Partner'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
          Đối Tác Chiến Lược
        </h1>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1 transition-all duration-500 hover:from-blue-500/20 hover:to-purple-500/20 h-full"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-900 p-6 flex flex-col h-full min-h-[400px]">
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                
                {/* Partner Logo */}
                <div className="relative h-24 w-24 mx-auto mb-6 overflow-hidden rounded-full bg-gray-800/50 p-2 flex items-center justify-center group-hover:bg-gray-800/70 transition-all duration-300 border-2 border-blue-500/20">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Partner Info */}
                <div className="space-y-4 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                    {partner.name}
                  </h3>
                  
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border border-blue-500/20 mx-auto">
                    {partner.partnership}
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {partner.description}
                  </p>

                  {/* Visit Website Button */}
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center mt-4 text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-2 duration-300"
                  >
                    Truy cập website
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            Lợi ích hợp tác
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl mb-2 text-blue-300">🤝</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Hợp tác chiến lược</h3>
              <p className="text-gray-400 text-sm">Cùng nhau phát triển và mở rộng thị trường esports Việt Nam</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl mb-2 text-blue-300">🎮</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Công nghệ tiên tiến</h3>
              <p className="text-gray-400 text-sm">Tiếp cận công nghệ mới nhất trong ngành gaming và esports</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl mb-2 text-blue-300">🏆</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Giải đấu chuyên nghiệp</h3>
              <p className="text-gray-400 text-sm">Tổ chức các giải đấu esports đẳng cấp quốc tế</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 