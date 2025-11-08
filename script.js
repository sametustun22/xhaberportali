
        const PROXY_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';
        
        const READ_LATER_KEY = 'readLaterItems'; 
        const RECENTLY_VIEWED_KEY = 'recentlyViewedItems';
        const READ_NEWS_KEY = 'readNewsItems';
        const STATS_KEY = 'newsPortalStats'; // YENİ
        const THEME_KEY = 'newsPortalTheme';
        const FONT_SIZE_KEY = 'newsPortalFontSize';
        const VIEW_MODE_KEY = 'newsPortalViewMode';
        const DATA_SAVER_KEY = 'newsPortalDataSaver';
        const SUMMARY_CATEGORY_KEY = 'newsPortalSummaryCategory'; 
        const SUMMARY_COUNT_KEY = 'newsPortalSummaryCount'; 
        const TUTORIAL_SEEN_KEY = 'newsPortalTutorialSeen'; // YENİ
        const CATEGORY_CONFIG_KEY = 'newsPortalCategoryConfig'; 
        
        const rssUrls = {
            general: 'https://www.hurriyet.com.tr/rss/gundem', 
            world: 'https://www.ntv.com.tr/dunya.rss',
            technology: 'https://www.donanimhaber.com/rss/tum', 
            science: 'https://www.ntv.com.tr/teknoloji.rss', // BİLİM -> TEKNOLOJİ OLARAK GÜNCELLENDİ
            sports: 'https://www.hurriyet.com.tr/rss/spor',
            business: 'https://www.dunya.com/rss', 
            health: 'https://www.ntv.com.tr/saglik.rss',
            entertainment: 'https://www.hurriyet.com.tr/rss/magazin'
        };
        
        const categoryNames = {
            general: 'Genel', 
            world: 'Dünya',
            technology: 'Teknoloji', 
            science: 'Bilim',
            sports: 'Spor',
            business: 'Ekonomi', 
            health: 'Sağlık',
            entertainment: 'Magazin'
        };


        // DOM Elementleri
        const newsGrid = document.getElementById('news-grid');
        const categoriesContainer = document.getElementById('categories-container'); 
        const newsModal = document.getElementById('news-modal');
        const readLaterModal = document.getElementById('read-later-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const searchInput = document.getElementById('search-input');
        const noResultsMessage = document.getElementById('no-results');
        const readLaterButton = document.getElementById('read-later-button');
        const readLaterCountSpan = document.getElementById('read-later-count');
        
        const listenSummaryButton = document.getElementById('listen-summary-button');
        const summaryTtsStatus = document.getElementById('tts-status-summary');
        const summaryVoiceSelect = document.getElementById('summary-voice-select');
        const dailySummaryList = document.getElementById('daily-summary'); 
        const summaryLoadingSpinner = document.getElementById('summary-loading-spinner'); 

        const progressBar = document.getElementById('progress-bar');
        const backToTopButton = document.getElementById('back-to-top');
        const themeToggleButton = document.getElementById('theme-toggle-button');
        const toggleGridViewBtn = document.getElementById('toggle-grid-view');
        const toggleListViewBtn = document.getElementById('toggle-list-view');
        const readLaterListContainer = document.getElementById('read-later-list');
        const recentlyViewedListContainer = document.getElementById('recently-viewed-list');
        const emptyListMessage = document.getElementById('empty-list-message');
        const emptyRecentlyMessage = document.getElementById('empty-recently-message');
        const modalTabButtons = document.querySelectorAll('.modal-tab-btn');
        
        const settingsModal = document.getElementById('settings-modal');
        const settingsButton = document.getElementById('settings-button');
        const closeSettingsModalBtn = document.getElementById('close-settings-modal');
        const dataSaverToggle = document.getElementById('data-saver-toggle');
        const summaryCategorySelect = document.getElementById('summary-category-select'); 
        const summaryCountSelect = document.getElementById('summary-count-select'); 
        const refreshButton = document.getElementById('refresh-button'); 
        const categoryManagementList = document.getElementById('category-management-list'); 
        
        const showSourcesBtn = document.getElementById('show-sources-btn');
        const sourcesModal = document.getElementById('sources-modal');
        const sourcesModalBody = document.getElementById('sources-modal-body');
        const closeSourcesModalBtn = document.getElementById('close-sources-modal');
        
        const filterButton = document.getElementById('filter-button'); // YENİ
        
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        const filterIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`;
        const filterUnreadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l3 7h12l3-7H3z"></path><path d="M10 12.46V19l4 2v-8.54"></path><path d="M15 3L12 6 9 3"></path></svg>`; // Örnek bir ikon
        const filterSavedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;


        // YENİ: Tema Tanımları
        const themes = {
            'light': { name: 'Aydınlık', className: '' },
            'dark': { name: 'Karanlık', className: 'dark-mode' },
            'sepia': { name: 'Sepya', className: 'sepia-mode' },
            'night-blue': { name: 'Gece Mavisi', className: 'night-blue-mode' }
        };

        // Global Veri
        let currentCategory = 'general';
        let allNewsItems = []; 
        let summaryNewsItems = []; 
        let summaryUtterance = null;
        let turkishVoices = []; 
        let globalModalFontSize = 1.05;
        let globalSummaryCount = 5; 
        let categoryConfig = []; 
        let allFeedsCache = { data: [], timestamp: 0 }; // YENİ: Kişiselleştirme için önbellek
        let currentFilter = 'all'; // YENİ: 'all', 'unread', 'saved'
        let currentTutorialStep = 0; // YENİ

        
        document.addEventListener('DOMContentLoaded', function() {
            initializeTheme();
            initializeFontSize();
            initializeViewMode(); 
            initializeDataSaverMode(); 
            initializeCategories(); 
            initializeSummaryCategory(); 
            initializeSummaryCount(); 
            
            if (!('speechSynthesis' in window)) {
                console.warn("Tarayıcınız sesli okuma API'sini desteklemiyor.");
                listenSummaryButton.disabled = true;
                listenSummaryButton.innerHTML = "<span>Desteklenmiyor</span>";
                summaryTtsStatus.textContent = "Tarayıcınız seslendirmeyi desteklemiyor.";
                summaryVoiceSelect.style.display = 'none';
            } else {
                if (speechSynthesis.onvoiceschanged !== undefined) {
                    speechSynthesis.onvoiceschanged = loadVoices;
                }
                loadVoices(); 
            }
            
            loadDailySummaryNews(); 
            
            const firstVisibleCategory = categoryConfig.find(c => c.visible)?.id || 'forYou';
            currentCategory = firstVisibleCategory;
            loadNews(currentCategory); 
            
            setupEventListeners();
            updateReadLaterCount(); 

            initializeTutorial(); // YENİ
        });

        // ---------- ÖĞRETİCİ (YENİ) ----------

        const tutorialSteps = [
            {
                title: "Haber Akışı ve Kategoriler",
                content: "Ana sayfada seçili kategoriye ait haberleri görürsünüz. Üstteki butonları kullanarak <strong>farklı kategoriler</strong> arasında geçiş yapabilirsiniz."
            },
            {
                title: "Arama ve Filtreleme",
                content: "Arama çubuğunu kullanarak haber başlıkları ve özetleri içinde arama yapabilirsiniz. <br><br>Filtre ( <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='display: inline-block; vertical-align: middle;'><polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon></svg> ) butonu ile <strong>okunmamış</strong> veya <strong>kaydedilmiş</strong> haberleri filtreleyebilirsiniz."
            },
            {
                title: "Listelerim",
                content: "Beğendiğiniz bir haberi daha sonra okumak için kalp ikonuna (❤️) tıklayarak <strong>Okuma Listenize</strong> ekleyebilirsiniz. Bu listeye, 'Listelerim' butonundan ulaşabilirsiniz. Burada ayrıca son gezdiğiniz haberleri ve okuma istatistiklerinizi de bulabilirsiniz."
            },
            {
                title: "Ayarlar ve Özelleştirme",
                content: "Ayarlar (⚙️) menüsünden <strong>karanlık mod</strong>, <strong>veri tasarruf modu</strong> gibi özellikleri yönetebilir ve kategori sıralamasını kendinize göre düzenleyebilirsiniz."
            },
            {
                title: "Keşfetmeye Hazırsınız!",
                content: "Artık sitenin temel özelliklerini biliyorsunuz. İyi okumalar dileriz!"
            }
        ];

        function initializeTutorial() {
            const tutorialSeen = localStorage.getItem(TUTORIAL_SEEN_KEY);
            if (!tutorialSeen) {
                document.getElementById('tutorial-modal').style.display = 'block';
                currentTutorialStep = 0;
                renderTutorialStep();
            }
        }

        function renderTutorialStep() {
            const step = tutorialSteps[currentTutorialStep];
            document.getElementById('tutorial-body').innerHTML = `
                <h4 style="font-size: 1.25rem; margin-bottom: 1rem;">${step.title}</h4>
                <p style="line-height: 1.6;">${step.content}</p>
            `;

            document.getElementById('tutorial-step-indicator').textContent = `Adım ${currentTutorialStep + 1} / ${tutorialSteps.length}`;
            document.getElementById('tutorial-prev-btn').style.display = currentTutorialStep > 0 ? 'inline-block' : 'none';
            document.getElementById('tutorial-next-btn').style.display = currentTutorialStep < tutorialSteps.length - 1 ? 'inline-block' : 'none';
            document.getElementById('tutorial-finish-btn').style.display = currentTutorialStep === tutorialSteps.length - 1 ? 'inline-block' : 'none';
        }

        function changeTutorialStep(direction) {
            const newStep = currentTutorialStep + direction;
            if (newStep >= 0 && newStep < tutorialSteps.length) {
                currentTutorialStep = newStep;
                renderTutorialStep();
            }
        }

        function closeTutorial() {
            const dontShowAgain = document.getElementById('dont-show-tutorial-again').checked;
            if (dontShowAgain) {
                localStorage.setItem(TUTORIAL_SEEN_KEY, 'true');
            }
            document.getElementById('tutorial-modal').style.display = 'none';
        }


        // ---------- EVENT LISTENERS (OLAY DİNLEYİCİLER) ----------

        function setupEventListeners() {
            document.getElementById('close-news-modal').addEventListener('click', () => {
                newsModal.style.display = 'none';
                stopCurrentAudio(); 
            });

            document.getElementById('close-read-later-modal').addEventListener('click', () => {
                readLaterModal.style.display = 'none';
            });
            
            readLaterButton.addEventListener('click', () => {
                switchModalTab('read-later-content');
                renderReadLaterList(); // Her zaman önce listeyi render et
                readLaterModal.style.display = 'block';
            });
            
            settingsButton.addEventListener('click', () => {
                renderCategoryManagementList();
                settingsModal.style.display = 'block';
            });
            
            closeSettingsModalBtn.addEventListener('click', () => {
                settingsModal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === newsModal) {
                    newsModal.style.display = 'none';
                    stopCurrentAudio(); 
                }
                if (event.target === readLaterModal) {
                    readLaterModal.style.display = 'none';
                }
                if (event.target === settingsModal) {
                    settingsModal.style.display = 'none';
                }
                if (event.target === sourcesModal) { 
                    sourcesModal.style.display = 'none';
                }
            });
            
            searchInput.addEventListener('input', () => filterAndRender(allNewsItems)); // YENİ
            
            if (listenSummaryButton) {
                listenSummaryButton.addEventListener('click', (e) => {
                    e.currentTarget.blur(); // Butonun focus'ta kalmasını engelle
                    playDailySummary();
                });
            }
            
            themeToggleButton.addEventListener('click', toggleTheme);
            window.addEventListener('scroll', handleScroll);
            backToTopButton.addEventListener('click', scrollToTop);
            
            toggleGridViewBtn.addEventListener('click', () => setViewMode('grid'));
            toggleListViewBtn.addEventListener('click', () => setViewMode('list'));
            
            modalTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.getAttribute('data-tab');
                    switchModalTab(tabId);
                    
                    if (tabId === 'read-later-content') {
                        renderReadLaterList();
                    } else if (tabId === 'recently-viewed-content') {
                        renderRecentlyViewedList();
                    } else if (tabId === 'stats-content') { // YENİ
                        renderStats();
                    }
                });
            });
            
            dataSaverToggle.addEventListener('change', (e) => {
                const isActive = e.target.checked;
                localStorage.setItem(DATA_SAVER_KEY, isActive);
                document.body.classList.toggle('data-saver-active', isActive);
            });
            
            refreshButton.addEventListener('click', () => {
                refreshButton.blur();
                const icon = refreshButton.querySelector('svg');
                icon.style.transition = 'transform 0.5s';
                icon.style.transform = 'rotate(360deg)';
                loadNews(currentCategory).finally(() => {
                    setTimeout(() => {
                        icon.style.transition = 'none';
                        icon.style.transform = 'none';
                    }, 500);
                });
            });
            
            showSourcesBtn.addEventListener('click', () => {
                renderSourceList(); 
                sourcesModal.style.display = 'block';
            });

            closeSourcesModalBtn.addEventListener('click', () => {
                sourcesModal.style.display = 'none';
            });
            
            filterButton.addEventListener('click', cycleFilter); // YENİ

            // YENİ: Öğretici olay dinleyicileri
            document.getElementById('close-tutorial-modal').addEventListener('click', closeTutorial);
            document.getElementById('tutorial-next-btn').addEventListener('click', () => changeTutorialStep(1));
            document.getElementById('tutorial-prev-btn').addEventListener('click', () => changeTutorialStep(-1));
            document.getElementById('tutorial-finish-btn').addEventListener('click', closeTutorial);
            window.addEventListener('click', (event) => {
                if (event.target === document.getElementById('tutorial-modal')) closeTutorial();
            });
        }
        
        // ---------- HABER YÜKLEME VE İŞLEME ----------

        async function loadNews(category) {
            renderSkeletonLoader(); 
            noResultsMessage.style.display = 'none';
            stopCurrentAudio();
            
            const fullUrl = PROXY_URL + encodeURIComponent(rssUrls[category]);

             // YENİ: "Sizin İçin" sekmesi seçiliyse, kişiselleştirilmiş akışı oluştur
            if (category === 'forYou') {
                return generatePersonalizedFeed();
            }
            try { 
                let response;
                for (let i = 0; i < 3; i++) { 
                    response = await fetch(fullUrl);
                    if (response.ok) break;
                    if (i < 2) await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
                
                if (!response || !response.ok) {
                    throw new Error(`HTTP Hata kodu: ${response ? response.status : 'Bilinmiyor'}. Proxy'ye erişilemiyor.`);
                }

                const data = await response.json();
                
                if (data.status !== 'ok' || data.items.length === 0) {
                    throw new Error("RSS kaynağına erişilemiyor veya boş akış.");
                }
                
                allNewsItems = data.items.map(item => {
                    const cleanFullText = removeHtmlTags(item.content || item.description || '');
                    return {
                        ...item, 
                        cleanFullText: cleanFullText,
                        cleanSummary: truncateText(cleanFullText, 120), 
                        pubDate: (item.pubDate || new Date().toISOString()), 
                        imageUrl: getImageUrl(item) || 'https://placehold.co/300x180/2563eb/ffffff?text=Haber',
                        id: item.link || item.title,
                        readingTime: estimateReadingTime(cleanFullText) 
                    }
                });
                
                filterAndRender(allNewsItems); // YENİ: renderNewsCards'ı doğrudan çağırmak yerine
                
            } catch (error) {
                console.error(`[HATA] Haber yüklenirken kritik hata oluştu (${category}):`, error);
                newsGrid.innerHTML = `<p class="text-center text-danger">Haberler yüklenirken bir hata oluştu: ${error.message}</p>`;
            }
        }
        
        // ---------- KİŞİSELLEŞTİRİLMİŞ AKIŞ ("SİZİN İÇİN") (YENİ) ----------

        async function getAllFeeds(force = false) {
            const CACHE_DURATION = 10 * 60 * 1000; // 10 dakika
            const now = new Date().getTime();

            if (!force && allFeedsCache.data.length > 0 && (now - allFeedsCache.timestamp < CACHE_DURATION)) {
                return allFeedsCache.data;
            }

            renderSkeletonLoader();
            const allFeedPromises = Object.entries(rssUrls).map(async ([catId, url]) => {
                try {
                    const response = await fetch(PROXY_URL + encodeURIComponent(url));
                    if (!response.ok) return [];
                    const data = await response.json();
                    return data.items.map(item => {
                        const cleanFullText = removeHtmlTags(item.content || item.description || '');
                        return {
                            ...item,
                            category: catId, // Haberin kategorisini ekle
                            cleanFullText: cleanFullText,
                            cleanSummary: truncateText(cleanFullText, 120),
                            pubDate: (item.pubDate || new Date().toISOString()),
                            imageUrl: getImageUrl(item) || 'https://placehold.co/300x180/2563eb/ffffff?text=Haber',
                            id: item.link || item.title,
                            readingTime: estimateReadingTime(cleanFullText)
                        };
                    });
                } catch (error) {
                    console.warn(`'${catId}' kategorisi yüklenemedi:`, error);
                    return [];
                }
            });

            const allFeedsArrays = await Promise.all(allFeedPromises);
            const combinedFeeds = allFeedsArrays.flat();

            // ID'ye göre haberleri tekilleştir
            const uniqueFeeds = Array.from(new Map(combinedFeeds.map(item => [item.id, item])).values());

            allFeedsCache = { data: uniqueFeeds, timestamp: now };
            return uniqueFeeds;
        }

        async function generatePersonalizedFeed() {
            const allItems = await getAllFeeds();
            allNewsItems = allItems; // Global `allNewsItems`'ı güncelle
            
            // YENİ: Okunmuş haberleri filtrele
            const readNewsIds = new Set(loadReadNewsItems());
            const unreadItems = allItems.filter(item => !readNewsIds.has(item.id));

            // 1. Kullanıcı verilerini topla
            const stats = JSON.parse(localStorage.getItem(STATS_KEY)) || { categories: {} };
            const recentlyViewed = loadRecentlyViewedItems().slice(0, 10); // Puanlama için son 10

            // 2. En çok okunan kategorileri bul
            const topCategories = Object.entries(stats.categories || {})
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3) // En iyi 3 kategori
                .map(([catId]) => catId);

            // 3. Son okunan haberlerden anahtar kelimeleri çıkar
            const stopWords = new Set(['ve', 'veya', 'ile', 'ama', 'için', 'bir', 'bu', 'şu', 'çok', 'daha', 'en', 'sonra', 'önce']);
            const keywords = new Set(
                recentlyViewed.flatMap(item =>
                    item.title.toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .split(/\s+/)
                    .filter(word => word.length > 4 && !stopWords.has(word))
                )
            );

            // Eğer hiç veri yoksa, en son haberleri göster
            if (topCategories.length === 0 && keywords.size === 0 && recentlyViewed.length === 0) {
                const latestNews = unreadItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)).slice(0, 20);
                renderNewsCards(latestNews);
                return;
            }

            // 4. Haberleri puanla
            const scoredItems = unreadItems.map(item => {
                let score = 0;
                const titleLower = item.title.toLowerCase();

                // Kategori eşleşmesi için puan
                if (topCategories.includes(item.category)) {
                    score += 5;
                }

                // Anahtar kelime eşleşmesi için puan
                keywords.forEach(keyword => {
                    if (titleLower.includes(keyword)) {
                        score += 3;
                    }
                });

                // Yenilik faktörü (daha yeni haberlere ek puan)
                const hoursAgo = (new Date() - new Date(item.pubDate)) / (1000 * 60 * 60);
                if (hoursAgo < 24) score += 2; // Son 24 saat
                if (hoursAgo < 6) score += 3;  // Son 6 saat

                return { ...item, score };
            }).filter(item => item.score > 0);

            const personalizedFeed = scoredItems.sort((a, b) => b.score - a.score).slice(0, 40); // En iyi 40 haberi al
            filterAndRender(personalizedFeed); // Arama ve filtreleme için `filterAndRender` kullan
        }

        function renderSkeletonLoader() {
            const viewMode = localStorage.getItem(VIEW_MODE_KEY) || 'grid';
            let skeletonHTML = '';
            
            for (let i = 0; i < 6; i++) {
                if (viewMode === 'list') {
                    skeletonHTML += `
                        <div class="skeleton-card list-view">
                            <div class="skeleton-image"></div>
                            <div class="skeleton-content">
                                <div class="skeleton-line short"></div>
                                <div class="skeleton-line"></div>
                                <div class="skeleton-line medium"></div>
                                <div class="skeleton-line short" style="margin-top: 1rem;"></div>
                            </div>
                        </div>
                    `;
                } else {
                    skeletonHTML += `
                        <div class="skeleton-card">
                            <div class="skeleton-image"></div>
                            <div class="skeleton-content">
                                <div class="skeleton-line short"></div>
                                <div class="skeleton-line"></div>
                                <div class="skeleton-line medium"></div>
                                <div class="skeleton-line short" style="margin-top: 1rem;"></div>
                            </div>
                        </div>
                    `;
                }
            }
            newsGrid.innerHTML = skeletonHTML;
        }
        
        function renderNewsCards(items, searchTerm = '') {
            newsGrid.innerHTML = ''; // Önce temizle
            const readLaterItems = loadReadLaterItems(); 
            const readNewsItems = loadReadNewsItems(); 

            if (items.length === 0) {
                noResultsMessage.style.display = 'block';
                return;
            }
            noResultsMessage.style.display = 'none';

            items.forEach(item => {
                const isSaved = readLaterItems.some(savedItem => (savedItem.id || savedItem.link) === item.id);
                const isRead = readNewsItems.includes(item.id); 
                
                const highlightedTitle = highlightText(item.title, searchTerm);
                const highlightedSummary = highlightText(item.cleanSummary, searchTerm);
                
                const newsCard = document.createElement('div');
                newsCard.className = `news-card ${isRead ? 'read' : ''}`;
                newsCard.setAttribute('data-id', item.id);

                const cardLink = document.createElement('a');
                cardLink.href = 'javascript:void(0)';
                cardLink.className = 'news-card-link';
                cardLink.addEventListener('click', () => {
                    openNewsModal(item);
                });
                
                cardLink.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.title}" class="news-image" onerror="this.src='https://placehold.co/300x180/2563eb/ffffff?text=Haber'">
                    <div class="news-content">
                        <span class="news-category">${getCategoryName(item.category || currentCategory)}</span>
                        <h3 class="news-title ${!isRead ? 'unread-title' : ''}">${highlightedTitle}</h3>
                        <p class="news-date">
                            Yayınlanma: ${formatLongDate(item.pubDate)} 
                            <span class="news-reading-time">• ☕ ${item.readingTime} dk</span>
                        </p>
                        <p class="news-summary">${highlightedSummary}</p>
                        
                        <span class="read-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            OKUNDU
                        </span>
                    </div>
                `;

                const saveButton = document.createElement('button');
                saveButton.className = `save-button ${isSaved ? 'saved' : ''}`;
                saveButton.setAttribute('data-id', item.id);
                saveButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

                saveButton.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    saveToReadLater(item, saveButton);
                    if (currentFilter === 'saved') {
                        filterAndRender(allNewsItems); // Filtre aktifse listeyi anında güncelle
                    }
                });

                newsCard.appendChild(cardLink);
                newsCard.appendChild(saveButton);
                newsGrid.appendChild(newsCard);
            });
        }
        
        // ---------- ARAMA/FİLTRELEME İŞLEVİ (YENİ KOMBİNE) ----------

        function filterAndRender(items) {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const readNewsItems = loadReadNewsItems();
            const savedItems = loadReadLaterItems();
            
            let filtered = items;

            // 1. Filtrele (Okunmamış/Kaydedilmiş)
            if (currentFilter === 'unread') {
                filtered = filtered.filter(item => !readNewsItems.includes(item.id));
            } else if (currentFilter === 'saved') {
                const savedIds = new Set(savedItems.map(i => i.id));
                filtered = filtered.filter(item => savedIds.has(item.id));
            }
            
            // 2. Arama terimine göre filtrele
            if (searchTerm) {
                filtered = filtered.filter(item => 
                    item.title.toLowerCase().includes(searchTerm) ||
                    (item.cleanSummary && item.cleanSummary.toLowerCase().includes(searchTerm))
                );
            }
            
            renderNewsCards(filtered, searchTerm);
        }
        
        function cycleFilter() {
            const filters = ['all', 'unread', 'saved'];
            const currentIndex = filters.indexOf(currentFilter);
            currentFilter = filters[(currentIndex + 1) % filters.length];
            
            // Update button UI
            if (currentFilter === 'unread') {
                filterButton.innerHTML = filterUnreadIcon;
                filterButton.classList.add('active-filter-unread');
                filterButton.classList.remove('active-filter-saved');
                filterButton.title = 'Filtre: Okunmamış';
            } else if (currentFilter === 'saved') {
                filterButton.innerHTML = filterSavedIcon;
                filterButton.classList.remove('active-filter-unread');
                filterButton.classList.add('active-filter-saved');
                 filterButton.title = 'Filtre: Kaydedilenler';
            } else {
                filterButton.innerHTML = filterIcon;
                filterButton.classList.remove('active-filter-unread', 'active-filter-saved');
                 filterButton.title = 'Filtrele';
            }

            filterAndRender(allNewsItems);
        }


        // ---------- GÜNÜN ÖZETİ ----------
        
        async function loadDailySummaryNews() {
            summaryLoadingSpinner.style.display = 'block';
            dailySummaryList.innerHTML = '';
            
            let summaryCategory = localStorage.getItem(SUMMARY_CATEGORY_KEY) || 'general';
            if (!rssUrls[summaryCategory]) summaryCategory = 'general';

            const fullUrl = PROXY_URL + encodeURIComponent(rssUrls[summaryCategory]);
            
            try {
                let response;
                 for (let i = 0; i < 3; i++) { 
                    response = await fetch(fullUrl);
                    if (response.ok) break;
                    if (i < 2) await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }

                if (!response || !response.ok) throw new Error("Özet alınamadı.");

                const data = await response.json();
                if (data.status !== 'ok') throw new Error("Özet akışı bozuk.");

                summaryNewsItems = data.items.map(item => {
                     const cleanFullText = removeHtmlTags(item.content || item.description || '');
                    return {
                        ...item, 
                        cleanFullText: cleanFullText,
                        imageUrl: getImageUrl(item),
                        id: item.link || item.title
                    }
                }).slice(0, globalSummaryCount); 

                renderDailySummary(summaryNewsItems);
            } catch (error) {
                console.error("Günün özeti yüklenemedi:", error);
                dailySummaryList.innerHTML = `<li class="summary-item text-danger">Özet yüklenirken bir hata oluştu.</li>`;
            } finally {
                summaryLoadingSpinner.style.display = 'none';
            }
        }

        function renderDailySummary(items) {
            dailySummaryList.innerHTML = ''; 
            if (!items || items.length === 0) {
                 dailySummaryList.innerHTML = `<li class="summary-item text-secondary">Özet bulunamadı.</li>`;
                return;
            }
            
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'summary-item';
                li.innerHTML = `<span class="summary-bullet"></span><span>${item.title}</span>`;
                li.addEventListener('click', () => openNewsModal(item));
                dailySummaryList.appendChild(li);
            });
        }
        
        
        // ---------- HABER MODALI ----------

        function openNewsModal(item) {
            markAsRead(item.id); 
            addRecentlyViewed(item);
            updateStats({ category: currentCategory }); // YENİ: Kategori okuma istatistiğini güncelle
            
            stopCurrentAudio();
            
            modalTitle.textContent = item.title;
            const viewMode = localStorage.getItem(VIEW_MODE_KEY) || 'grid';
            
            modalBody.innerHTML = `
                <div class="spinner"></div>
                <!-- İçerik buraya yüklenecek -->
            `;
            newsModal.style.display = 'block';
             document.body.style.overflow = 'hidden'; 

            // İçerik yüklemesi
            setTimeout(() => {
                const readLaterItems = loadReadLaterItems();
                const isSaved = readLaterItems.some(savedItem => savedItem.id === item.id);

                // İlgili haberleri bul ve HTML'ini oluştur
                const relatedNews = findRelatedNews(item, allNewsItems, 3);
                const relatedNewsHTML = renderRelatedNews(relatedNews);
                
                modalBody.innerHTML = `
                    <div id="tts-controls" class="tts-controls">
                         <button id="tts-button" class="tts-button" ${!window.speechSynthesis ? 'disabled' : ''}>
                           <div class="spinner-small" style="display: none;"></div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="play-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pause-icon" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                           <span>Oku</span>
                        </button>
                        <span id="tts-status" class="tts-status">Okumaya hazır.</span>
                        <div class="font-controls">
                            <span class="font-size-label">Yazı Boyutu:</span>
                            <button id="font-decrease-btn" class="font-btn">-</button>
                            <button id="font-increase-btn" class="font-btn">+</button>
                        </div>
                    </div>
                    
                    <div class="tts-controls" style="padding-top: 0; border-top: 0;">
                        <button id="share-button">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                           <span>Paylaş</span>
                        </button>
                         <button id="zen-mode-toggle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                           <span>Zen Modu</span>
                        </button>
                    </div>

                    <img src="${item.imageUrl}" alt="${item.title}" class="modal-image" onerror="this.src='https://placehold.co/800x400/2563eb/ffffff?text=Haber'; this.style.display='none';">
                    <p class="modal-date">Yayınlanma: ${new Date(item.pubDate).toLocaleString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    <div class="modal-text" style="font-size:${globalModalFontSize}rem;">${highlightLinks(item.cleanFullText)}</div>
                    ${relatedNewsHTML}
                `;
                
                // Event Listeners for Modal controls
                const ttsButton = document.getElementById('tts-button'); 
                if (ttsButton) {
                    ttsButton.addEventListener('click', () => {
                         const textToRead = item.title + ". " + item.cleanFullText;
                         playText(textToRead, 'tts-button','tts-status');
                    });
                }
                
                document.getElementById('font-decrease-btn').addEventListener('click', () => changeFontSize(-0.1));
                document.getElementById('font-increase-btn').addEventListener('click', () => changeFontSize(0.1));
                document.getElementById('share-button').addEventListener('click', () => shareNews(item));
                document.getElementById('zen-mode-toggle').addEventListener('click', toggleZenMode);

            }, 200); 
            
            const newsCard = newsGrid.querySelector(`.news-card[data-id="${item.id}"]`);
            if (newsCard) {
                if (!newsCard.classList.contains('read')) {
                    newsCard.classList.add('read');
                    updateStats({ read: 1 });

                    // Başlığın kalınlığını anında kaldır
                    const titleElement = newsCard.querySelector('.news-title');
                    if (titleElement) {
                        titleElement.classList.remove('unread-title');
                    }
                }
            }
             document.body.style.overflow = '';
        }
        
        function highlightLinks(text) {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        }

        // ---------- İLGİLİ HABERLER (YENİ) ----------

        function findRelatedNews(currentItem, allItems, count = 3) {
            const stopWords = new Set(['ve', 'veya', 'ile', 'ama', 'fakat', 'çünkü', 'bir', 'bu', 'şu', 'o', 'için', 'gibi', 'olarak', 'daha', 'en', 'çok', 'bazı', 'her', 'hiç', 'ise', 'de', 'da', 'mi', 'mı', 'mu', 'mü', 'bir', 'şey']);

            const keywords = currentItem.title.toLowerCase()
                .replace(/[^\w\s]/g, '') // Noktalama işaretlerini kaldır
                .split(/\s+/)
                .filter(word => word.length > 3 && !stopWords.has(word));

            if (keywords.length === 0) return [];

            const scoredItems = allItems
                .filter(item => item.id !== currentItem.id) // Kendisini hariç tut
                .map(item => {
                    let score = 0;
                    const titleLower = item.title.toLowerCase();
                    const contentLower = item.cleanFullText.toLowerCase();

                    keywords.forEach(keyword => {
                        if (titleLower.includes(keyword)) score += 3; // Başlık eşleşmesine daha yüksek puan
                        if (contentLower.includes(keyword)) score += 1; // İçerik eşleşmesine daha düşük puan
                    });
                    return { ...item, score };
                })
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score);

            return scoredItems.slice(0, count);
        }

        function renderRelatedNews(relatedItems) {
            if (relatedItems.length === 0) return '';

            const itemsHTML = relatedItems.map(item => `
                <div class="related-news-item" data-id='${item.id}'>
                    <img src="${item.imageUrl}" alt="${item.title}" class="related-news-image" onerror="this.style.display='none'">
                    <div class="related-news-content">
                        <h5 class="related-news-title">${item.title}</h5>
                        <span class="related-news-date">${formatLongDate(item.pubDate)}</span>
                    </div>
                </div>
            `).join('');

            // İlgili haberlere tıklandığında modalı yeniden açmak için event listener
            document.addEventListener('click', function(e) {
                const relatedItemDiv = e.target.closest('.related-news-item');
                if (relatedItemDiv) {
                    const newsId = relatedItemDiv.dataset.id;
                    const newsItem = allNewsItems.find(n => n.id === newsId);
                    if (newsItem) openNewsModal(newsItem);
                }
            }, { once: true }); // Olay dinleyiciyi bir kez çalışacak şekilde ayarla

            return `
                <div class="related-news-container">
                    <h4 class="related-news-section-title">İlgili Haberler</h4>
                    ${itemsHTML}
                </div>
            `;
        }


        // ---------- DİĞER LİSTELER (OKUMA LİSTESİ / SON GEZİLENLER) ----------
        function saveToReadLater(item, button) {
            let items = loadReadLaterItems();
            const index = items.findIndex(i => (i.id || i.link) === (item.id || item.link));

            if (index > -1) {
                // Remove
                items.splice(index, 1);
                if (button) {
                    button.classList.remove('saved');
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
                }
            } else {
                // Add
                const newItem = {
                    title: item.title,
                    link: item.link, 
                    id: item.id,
                    cleanFullText: item.cleanFullText,
                    imageUrl: item.imageUrl,
                    pubDate: item.pubDate,
                    savedAt: new Date().toISOString(),
                    note: "" // YENİ: Not alanı
                };
                items.unshift(newItem); // En üste ekle
                if (button) {
                    button.classList.add('saved');
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
                }
            }
            
            localStorage.setItem(READ_LATER_KEY, JSON.stringify(items));
            updateReadLaterCount();

            // Eğer "Okuma Listesi" sekmesi açıksa, listeyi yeniden render et
            if (readLaterModal.style.display === 'block' && document.getElementById('read-later-content').classList.contains('active')) {
                renderReadLaterList();
            }
        }
        
        function renderReadLaterList() {
            const items = loadReadLaterItems();
            readLaterListContainer.innerHTML = '';

            if (items.length === 0) {
                emptyListMessage.style.display = 'block';
                return;
            }
            emptyListMessage.style.display = 'none';

            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'read-later-item';
                itemEl.innerHTML = `
                    <div class="read-later-item-main">
                        <span class="read-later-item-title">${item.title}</span>
                        <div class="read-later-item-controls">
                            <span class="read-later-item-date" title="${formatFullDate(item.savedAt)}">${timeAgo(item.savedAt)}</span>
                            <button class="note-button" title="Not Ekle/Düzenle">📝</button>
                            <button class="remove-button" title="Listeden Kaldır">🗑️</button>
                        </div>
                    </div>
                    ${item.note ? `<div class="note-display">${escapeHTML(item.note)}</div>` : ''}
                    <div class="note-edit-area">
                        <textarea>${escapeHTML(item.note || '')}</textarea>
                        <div class="note-edit-controls">
                            <button class="note-save-btn">Kaydet</button>
                            <button class="note-cancel-btn">İptal</button>
                        </div>
                    </div>
                `;
                
                itemEl.querySelector('.read-later-item-title').addEventListener('click', () => {
                     readLaterModal.style.display = 'none';
                     openNewsModal(item);
                });

                itemEl.querySelector('.remove-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    saveToReadLater(item, null); // remove
                    renderReadLaterList(); // re-render
                });
                
                const noteButton = itemEl.querySelector('.note-button');
                const noteEditArea = itemEl.querySelector('.note-edit-area');
                const noteDisplay = itemEl.querySelector('.note-display');
                const noteSaveBtn = itemEl.querySelector('.note-save-btn');
                const noteCancelBtn = itemEl.querySelector('.note-cancel-btn');
                const textarea = itemEl.querySelector('textarea');

                noteButton.addEventListener('click', () => {
                    noteEditArea.style.display = noteEditArea.style.display === 'block' ? 'none' : 'block';
                });

                noteCancelBtn.addEventListener('click', () => {
                    noteEditArea.style.display = 'none';
                    textarea.value = item.note || ''; // Reset changes
                });
                
                noteSaveBtn.addEventListener('click', () => {
                    const newNote = textarea.value;
                    saveNoteToReadLater(item.id, newNote);
                    item.note = newNote; // Update item in memory for re-render
                    noteEditArea.style.display = 'none';
                    
                    // Update display immediately
                    if (noteDisplay) {
                        noteDisplay.textContent = newNote;
                        noteDisplay.style.display = newNote ? 'block' : 'none';
                    } else if (newNote) {
                        const newNoteDisplay = document.createElement('div');
                        newNoteDisplay.className = 'note-display';
                        newNoteDisplay.textContent = newNote;
                        itemEl.insertBefore(newNoteDisplay, noteEditArea);
                    }
                });


                readLaterListContainer.appendChild(itemEl);
            });
        }
        
        function saveNoteToReadLater(itemId, noteText) {
            let items = loadReadLaterItems();
            const index = items.findIndex(i => i.id === itemId);
            if (index > -1) {
                items[index].note = noteText;
                localStorage.setItem(READ_LATER_KEY, JSON.stringify(items));
            }
        }
        
        function addRecentlyViewed(item) {
             let items = loadRecentlyViewedItems();
             
             // Remove if already exists to move it to the top
             const index = items.findIndex(i => (i.id || i.link) === (item.id || item.link));
             if (index > -1) {
                 items.splice(index, 1);
             }

             const newItem = {
                 title: item.title,
                 link: item.link,
                 id: item.id,
                 cleanFullText: item.cleanFullText,
                 imageUrl: item.imageUrl,
                 pubDate: item.pubDate,
                 viewedAt: new Date().toISOString()
             };
             
             items.unshift(newItem);

             // Keep the list at a reasonable size (e.g., 20)
             if (items.length > 20) {
                 items = items.slice(0, 20);
             }

             localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
        }

        function renderRecentlyViewedList() {
            const items = loadRecentlyViewedItems();
            recentlyViewedListContainer.innerHTML = '';
            
            if (items.length === 0) {
                emptyRecentlyMessage.style.display = 'block';
                return;
            }
            emptyRecentlyMessage.style.display = 'none';

            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'read-later-item'; // Re-use style
                itemEl.innerHTML = `
                     <div class="read-later-item-main">
                        <span class="read-later-item-title">${item.title}</span>
                         <span class="read-later-item-date" title="${formatFullDate(item.viewedAt)}">${timeAgo(item.viewedAt)}</span>
                    </div>
                `;
                itemEl.querySelector('.read-later-item-title').addEventListener('click', () => {
                     readLaterModal.style.display = 'none';
                     openNewsModal(item);
                });
                recentlyViewedListContainer.appendChild(itemEl);
            });
        }
        
        function updateReadLaterCount() {
            const items = loadReadLaterItems();
            readLaterCountSpan.textContent = items.length;
        }

        function loadReadLaterItems() {
            return JSON.parse(localStorage.getItem(READ_LATER_KEY)) || [];
        }
        
        function loadRecentlyViewedItems() {
             return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
        }
        
        // ---------- OKUNDU İŞARETLEME VE İSTATİSTİK (YENİ) ----------

        function markAsRead(newsId) {
            let readItems = loadReadNewsItems();
            if (!readItems.includes(newsId)) {
                readItems.push(newsId);
                localStorage.setItem(READ_NEWS_KEY, JSON.stringify(readItems));
            }
        }
        
        function loadReadNewsItems() {
            return JSON.parse(localStorage.getItem(READ_NEWS_KEY)) || [];
        }

        function updateStats({ read = 0, category = null }) {
            let stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {
                totalRead: 0,
                lastReadDate: null,
                streak: 0,
                categories: {}
            };

            // Geriye dönük uyumluluk için: Eğer 'categories' anahtarı yoksa, ekle.
            if (!stats.categories) stats.categories = {};

            const today = new Date().toISOString().split('T')[0];

            if (read > 0) {
                stats.totalRead += read;

                if (stats.lastReadDate) {
                    const lastRead = new Date(stats.lastReadDate);
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];
                    
                    if(stats.lastReadDate === today) {
                        // Already counted today
                    } else if (stats.lastReadDate === yesterdayStr) {
                         stats.streak++; // Continue streak
                    } else {
                        stats.streak = 1; // Reset streak
                    }
                } else {
                    stats.streak = 1; // First read
                }
                stats.lastReadDate = today;
            }
            
            if(category) {
                stats.categories[category] = (stats.categories[category] || 0) + 1;
            }

            localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        }

        function renderStats() {
            let stats = JSON.parse(localStorage.getItem(STATS_KEY)) || { totalRead: 0, streak: 0, categories: {} };
            
            // Streak'i kontrol et. Eğer son okuma dünden önceyse sıfırla.
             const today = new Date().toISOString().split('T')[0];
             const yesterday = new Date();
             yesterday.setDate(yesterday.getDate() - 1);
             const yesterdayStr = yesterday.toISOString().split('T')[0];
             
             if (stats.lastReadDate && stats.lastReadDate !== today && stats.lastReadDate !== yesterdayStr) {
                 stats.streak = 0;
                 localStorage.setItem(STATS_KEY, JSON.stringify(stats)); // Güncellenmiş seriyi kaydet
             }

            document.getElementById('stat-total-read').textContent = stats.totalRead;
            document.getElementById('stat-read-streak').textContent = stats.streak;
            
            const categoryList = document.getElementById('stat-category-list');
            categoryList.innerHTML = '';
            
            const sortedCategories = Object.entries(stats.categories)
                .sort(([,a],[,b]) => b - a);

            if (sortedCategories.length === 0) {
                 categoryList.innerHTML = '<li class="text-secondary italic">Henüz kategori verisi yok.</li>';
            } else {
                sortedCategories.forEach(([catId, count]) => {
                    const li = document.createElement('li');
                    li.className = 'category-stat-item';
                    li.innerHTML = `
                        <strong>${getCategoryName(catId)}</strong>
                        <span>${count} haber</span>
                    `;
                    categoryList.appendChild(li);
                });
            }
        }
        
        // ---------- KATEGORİ YÖNETİMİ VE AYARLAR ----------

        function initializeCategories() {
            const savedConfig = JSON.parse(localStorage.getItem(CATEGORY_CONFIG_KEY));
            
            if (savedConfig && savedConfig.length > 0) {
                categoryConfig = savedConfig; 
                // Geriye dönük uyumluluk: Eğer 'forYou' yoksa ekle
                if (!categoryConfig.find(c => c.id === 'forYou')) {
                    categoryConfig.unshift({
                        id: 'forYou',
                        name: 'Sizin İçin ✨',
                        visible: true
                    });
                }
            } else {
                // Default config
                categoryConfig = Object.keys(rssUrls).map(id => ({
                    id: id,
                    name: categoryNames[id],
                    visible: true
                }));
                categoryConfig.unshift({
                    id: 'forYou', name: 'Sizin İçin ✨',
                    visible: true
                });
            }
             saveCategoryConfig(); // Save to ensure it's in storage
            renderCategoryButtons();
        }

        function renderCategoryButtons() {
            categoriesContainer.innerHTML = '';
            const visibleCategories = categoryConfig.filter(c => c.visible);
            
            visibleCategories.forEach(cat => {
                const button = document.createElement('button');
                button.className = 'category-btn';
                button.textContent = cat.name;
                button.setAttribute('data-category', cat.id);
                if (cat.id === currentCategory) {
                    button.classList.add('active');
                }
                button.addEventListener('click', () => {
                    currentCategory = cat.id;
                    const activeBtn = categoriesContainer.querySelector('.active');
                    if (activeBtn) activeBtn.classList.remove('active');
                    button.classList.add('active');
                    loadNews(currentCategory);
                }); 
                // YENİ: "Sizin İçin" sekmesi için özel olay dinleyici
                if (cat.id === 'forYou') {
                    button.addEventListener('click', () => generatePersonalizedFeed());
                }
                categoriesContainer.appendChild(button);
            });
        }
        
        function renderCategoryManagementList() {
            categoryManagementList.innerHTML = ''; 
            categoryConfig.forEach(cat => {
                const itemEl = document.createElement('li');
                itemEl.className = 'category-management-item';
                itemEl.setAttribute('data-id', cat.id);
                if (cat.id === 'forYou') itemEl.style.opacity = 0.7; // "Sizin İçin" sekmesini biraz farklı göster
                itemEl.draggable = true;
                itemEl.innerHTML = `
                    <span class="drag-handle">☰</span>
                    <span>${cat.name}</span>
                    <label class="toggle-switch">
                        <input type="checkbox" ${cat.visible ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                `;

                if (cat.id === 'forYou') {
                    itemEl.querySelector('.drag-handle').style.cursor = 'not-allowed';
                    itemEl.draggable = false;
                }
                
                const toggle = itemEl.querySelector('input');
                toggle.addEventListener('change', () => {
                    cat.visible = toggle.checked;
                    saveAndRerenderCategories();
                });
                
                if (cat.id !== 'forYou') {
                    itemEl.addEventListener('dragstart', handleDragStart);
                    itemEl.addEventListener('dragover', handleDragOver);
                    itemEl.addEventListener('dragleave', handleDragLeave);
                    itemEl.addEventListener('drop', handleDrop);
                    itemEl.addEventListener('dragend', handleDragEnd);
                }

                categoryManagementList.appendChild(itemEl);
            });
        }
        
        // --- Drag & Drop Handlers ---
        let draggedItem = null;

        function handleDragStart(e) {
            draggedItem = this;
            setTimeout(() => {
                this.classList.add('dragging');
            }, 0);
        }
        function handleDragEnd() {
            this.classList.remove('dragging');
            draggedItem = null;
        }
        function handleDragOver(e) {
            e.preventDefault();
            this.style.backgroundColor = 'var(--light-bg)';
        }
        function handleDragLeave() {
            this.style.backgroundColor = 'var(--card-bg)';
        }
        function handleDrop(e) {
            e.preventDefault();
            this.style.backgroundColor = 'var(--card-bg)';
            
            if (this.getAttribute('data-id') === 'forYou') return; // "Sizin İçin" üzerine sürüklenemez

            if (draggedItem && draggedItem !== this) {
                const fromId = draggedItem.getAttribute('data-id');
                const toId = this.getAttribute('data-id');

                const fromIndex = categoryConfig.findIndex(c => c.id === fromId);
                const toIndex = categoryConfig.findIndex(c => c.id === toId);

                const [movedItem] = categoryConfig.splice(fromIndex, 1);
                categoryConfig.splice(toIndex, 0, movedItem);
                
                saveAndRerenderCategories();
            }
        }

        function saveAndRerenderCategories() {
            saveCategoryConfig();
            renderCategoryButtons();
             renderCategoryManagementList();
             initializeSummaryCategory(); // Güncel listeyi özet ayarına yansıt
        }
        
        function saveCategoryConfig() {
            localStorage.setItem(CATEGORY_CONFIG_KEY, JSON.stringify(categoryConfig));
        }
        
        function initializeSummaryCategory() {
            summaryCategorySelect.innerHTML = ''; // Temizle
            categoryConfig.filter(c => c.id !== 'forYou').forEach(cat => { // "Sizin İçin" hariç
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                summaryCategorySelect.appendChild(option);
            });
            
            const savedCategory = localStorage.getItem(SUMMARY_CATEGORY_KEY) || 'general';
            summaryCategorySelect.value = savedCategory;
            
            summaryCategorySelect.addEventListener('change', (e) => {
                localStorage.setItem(SUMMARY_CATEGORY_KEY, e.target.value);
                loadDailySummaryNews(); 
            });
        }
        
        function initializeSummaryCount() {
            const savedCount = localStorage.getItem(SUMMARY_COUNT_KEY) || 5;
            summaryCountSelect.value = savedCount;
            globalSummaryCount = parseInt(savedCount, 10);

            summaryCountSelect.addEventListener('change', (e) => {
                const count = parseInt(e.target.value, 10);
                globalSummaryCount = count;
                localStorage.setItem(SUMMARY_COUNT_KEY, count);
                 loadDailySummaryNews();
            });
        }

        // ---------- SESLENDİRME (TTS) ----------
        
        function loadVoices() {
            turkishVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('tr'));
            
            if (turkishVoices.length === 0) {
                 console.log("Türkçe seslendirme motoru bulunamadı. Varsayılan kullanılacak.");
                 summaryVoiceSelect.style.display = 'none';
                 return;
            }
             summaryVoiceSelect.style.display = 'inline-block';
             summaryVoiceSelect.innerHTML = '<option value="">Otomatik (Varsayılan)</option>';
             turkishVoices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.setAttribute('data-name', voice.name);
                summaryVoiceSelect.appendChild(option);
            });
        }
        
        function playDailySummary() {
            if (summaryNewsItems.length > 0) {
                const textToRead = `Günün öne çıkan ${summaryNewsItems.length} haberi şöyle. ` + summaryNewsItems.map(item => item.title).join('. ');
                playText(textToRead, 'listen-summary-button', 'tts-status-summary', summaryVoiceSelect);
            }
        }
        
        function playText(text, buttonId, statusId, voiceSelectEl = null) {
            const button = document.getElementById(buttonId);
            const status = document.getElementById(statusId);
            const playIcon = button.querySelector('.play-icon');
            const pauseIcon = button.querySelector('.pause-icon');
            const spinner = button.querySelector('.spinner-small');
            const buttonText = button.querySelector('span');
            
             if (speechSynthesis.speaking && summaryUtterance) {
                if (speechSynthesis.paused) {
                    speechSynthesis.resume();
                    status.textContent = "Okuma sürdürülüyor...";
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'inline-block';
                    buttonText.textContent = "Duraklat";
                } else {
                    speechSynthesis.pause();
                    status.textContent = "Okuma duraklatıldı.";
                    playIcon.style.display = 'inline-block';
                    pauseIcon.style.display = 'none';
                    buttonText.textContent = "Sürdür";
                }
                return;
            }
            
            stopCurrentAudio(); 

            summaryUtterance = new SpeechSynthesisUtterance(text);

            if (voiceSelectEl && voiceSelectEl.value) {
                 const selectedVoiceName = voiceSelectEl.options[voiceSelectEl.selectedIndex].getAttribute('data-name');
                 const voice = turkishVoices.find(v => v.name === selectedVoiceName);
                 if (voice) summaryUtterance.voice = voice;
            } else if (turkishVoices.length > 0) {
                 summaryUtterance.voice = turkishVoices[0]; // İlk Türkçe sesi seç
                 summaryUtterance.lang = 'tr-TR';
            }
            
            summaryUtterance.onstart = () => {
                spinner.style.display = 'none';
                status.textContent = "Okunuyor...";
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline-block';
                buttonText.textContent = "Duraklat";
            };

            summaryUtterance.onend = () => {
                status.textContent = "Okuma tamamlandı.";
                playIcon.style.display = 'inline-block';
                pauseIcon.style.display = 'none';
                buttonText.textContent = "Oku";
                summaryUtterance = null;
            };

            summaryUtterance.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
                status.textContent = `Hata: ${event.error}`;
                spinner.style.display = 'none';
                playIcon.style.display = 'inline-block';
                pauseIcon.style.display = 'none';
                buttonText.textContent = "Oku";
                summaryUtterance = null;
            };
            
            // Başlat
            spinner.style.display = 'inline-block';
            playIcon.style.display = 'none';
            status.textContent = "Ses hazırlanıyor...";
            buttonText.textContent = "Hazırlan..";
            
            setTimeout(() => { 
                speechSynthesis.speak(summaryUtterance);
            }, 100);
        }
        
        function stopCurrentAudio() {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
             summaryUtterance = null;
        }

        // ---------- UI (KULLANICI ARAYÜZÜ) YARDIMCILARI ----------
        
        function initializeTheme() {
            const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
            setTheme(savedTheme);
            renderThemeSelector();
        }

        function toggleTheme() {
            const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        }

        function setTheme(themeId) {
            if (!themes[themeId]) return;

            // Önceki tema sınıflarını temizle
            Object.values(themes).forEach(theme => {
                if (theme.className) document.body.classList.remove(theme.className);
            });

            // Yeni tema sınıfını ekle
            const newTheme = themes[themeId];
            if (newTheme.className) {
                document.body.classList.add(newTheme.className);
            }

            localStorage.setItem(THEME_KEY, themeId);
            updateThemeButton(themeId === 'dark' || themeId === 'night-blue');
            
            // Ayarlar modalındaki seçimi güncelle
            const themeOptions = document.querySelectorAll('.theme-option');
            themeOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.themeId === themeId);
            });
        }
        
        function updateThemeButton(isDarkMode) {
            themeToggleButton.innerHTML = isDarkMode ? sunIcon : moonIcon;
            themeToggleButton.title = isDarkMode ? "Aydınlık Tema" : "Karanlık Tema";
        }

        // YENİ: Tema seçiciyi render et
        function renderThemeSelector() {
            const container = document.getElementById('theme-selector');
            if (!container) return;
            container.innerHTML = Object.entries(themes).map(([id, theme]) => `
                <div class="theme-option" data-theme-id="${id}">
                    <span class="theme-name">${theme.name}</span>
                </div>
            `).join('');

            container.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', () => setTheme(option.dataset.themeId));
            });
        }

        function handleScroll() {
            const scrollPosition = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollPosition / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
            
            if (scrollPosition > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function initializeFontSize() {
            const savedSize = localStorage.getItem(FONT_SIZE_KEY);
            if (savedSize) {
                globalModalFontSize = parseFloat(savedSize);
            }
        }
        
        function changeFontSize(amount) {
            const newSize = globalModalFontSize + amount;
            if (newSize >= 0.8 && newSize <= 1.5) { // min/max font size
                globalModalFontSize = newSize;
                const modalText = document.querySelector('.modal-text');
                if (modalText) {
                    modalText.style.fontSize = `${globalModalFontSize}rem`;
                }
                localStorage.setItem(FONT_SIZE_KEY, globalModalFontSize);
            }
        }
        
        function initializeViewMode() {
            const savedMode = localStorage.getItem(VIEW_MODE_KEY) || 'grid';
            setViewMode(savedMode, true);
        }
        
        function setViewMode(mode, isInitialization = false) {
            if (!isInitialization && (localStorage.getItem(VIEW_MODE_KEY) || 'grid') === mode) return;
            
            if (mode === 'list') {
                newsGrid.classList.add('list-view');
                toggleListViewBtn.classList.add('active');
                toggleGridViewBtn.classList.remove('active');
            } else { // 'grid'
                newsGrid.classList.remove('list-view');
                toggleGridViewBtn.classList.add('active');
                toggleListViewBtn.classList.remove('active');
            }
            localStorage.setItem(VIEW_MODE_KEY, mode);
            
            // Eğer iskelet yükleyici gösteriliyorsa, onu yeni görünüme göre yeniden render et
             if (newsGrid.querySelector('.skeleton-card')) {
                renderSkeletonLoader();
            }
        }
        
        function initializeDataSaverMode() {
            const isActive = localStorage.getItem(DATA_SAVER_KEY) === 'true';
            dataSaverToggle.checked = isActive;
            document.body.classList.toggle('data-saver-active', isActive);
        }
        
        function switchModalTab(tabId) {
             modalTabButtons.forEach(btn => btn.classList.remove('active'));
             document.querySelector(`.modal-tab-btn[data-tab="${tabId}"]`).classList.add('active');

             document.querySelectorAll('.modal-tab-content').forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
             });
             
             const activeContent = document.getElementById(tabId);
             activeContent.style.display = 'block';
             activeContent.classList.add('active');
        }
        
        function renderSourceList() {
            sourcesModalBody.innerHTML = '<ul>' + 
                Object.keys(rssUrls).map(key => `
                    <li>
                        <strong>${getCategoryName(key)}:</strong>
                        <span>${rssUrls[key]}</span>
                    </li>
                `).join('') + 
                '</ul>';
        }
        
        async function shareNews(item) {
            const shareData = {
                title: item.title,
                text: `Şu habere bir göz at: "${item.title}"`,
                url: item.link
            };
            try {
                if (navigator.share && navigator.canShare(shareData)) {
                     await navigator.share(shareData);
                } else {
                     // Fallback for browsers that don't support navigator.share
                     await navigator.clipboard.writeText(item.link);
                     alert("Haber linki panoya kopyalandı!");
                }
            } catch (err) {
                console.error("Paylaşım hatası:", err);
                alert("Haber paylaşılamadı veya link kopyalanamadı.");
            }
        }
        
         function toggleZenMode(event) {
            const modalContent = document.querySelector('#news-modal .modal-content');
            modalContent.classList.toggle('zen-mode');
            const button = event.currentTarget;
            if (modalContent.classList.contains('zen-mode')) {
                button.innerHTML = button.innerHTML.replace('Zen Modu', 'Normal Mod');
            } else {
                 button.innerHTML = button.innerHTML.replace('Normal Mod', 'Zen Modu');
            }
        }

        // ---------- YARDIMCI İŞLEVLER (UTILITIES) ----------

        function getImageUrl(item) {
            // Priority 1: media:content
            if (item.enclosure && (item.enclosure.type?.includes('image') || item.enclosure.link?.match(/\.(jpeg|jpg|gif|png)$/))) {
                return item.enclosure.link;
            }
            // Priority 2: Look for <img> in description/content
            const content = item.content || item.description || '';
            const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) {
                return imgMatch[1];
            }
            // Priority 3: Thumbnail
             if (item.thumbnail && typeof item.thumbnail === 'string') {
                return item.thumbnail;
             }
             if (typeof item.thumbnail === 'object' && item.thumbnail.url) { // some feeds have it as object
                 return item.thumbnail.url;
             }

            return null; // No image found
        }
        
        function highlightText(text, term) {
            if (!term) return text;
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }
        
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        }
        
        function escapeHTML(str) {
            if (typeof str !== 'string') return '';
            return str.replace(/[&<>"']/g, function(match) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[match];
            });
        }

        function removeHtmlTags(html) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }

        function truncateText(text, length) {
            return text.length > length ? text.substring(0, length) + '...' : text;
        }

        function timeAgo(dateString) {
            const now = new Date();
            const past = new Date(dateString); // Gelen tarih string'ini Date objesine çevir

            // Eğer 'past' geçerli bir tarih değilse (örn: geçersiz format), NaN döner.
            // Bu durumda, anlamsız bir sayı göstermek yerine genel bir ifade döndür.
            if (isNaN(past.getTime())) {
                return "bir süre önce";
            }

            const seconds = Math.floor((now - past) / 1000);

            // Eğer saniye negatifse (kaynağın saati ilerideyse),
            // bunu gelecekten bir tarih olarak kabul edip "az önce" olarak göster.
            if (seconds < 0) {
                return "az önce";
            }
            
            if (seconds < 60) {
                return "az önce";
            }

            const intervals = {
                yıl: 31536000,
                ay: 2592000,
                gün: 86400,
                saat: 3600,
                dakika: 60
            };

            for (const unit in intervals) {
                const interval = Math.floor(seconds / intervals[unit]);
                if (interval >= 1) {
                    return `${interval} ${unit} önce`;
                }
            }
            
            return "az önce"; // Fallback
        }
        
        function formatFullDate(dateString) {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Geçersiz tarih";
            }
            
            // 'tr-TR' lokalizasyonu ve 2 haneli format için seçenekler
            const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            
            // toLocaleString'in ürettiği "25.10.2023, 15:30" formatındaki virgülü kaldır
            return date.toLocaleString('tr-TR', options).replace(',', '');
        }

        function formatLongDate(dateString) {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Geçersiz tarih";
            }
            const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            return date.toLocaleString('tr-TR', options);
        }

        function estimateReadingTime(text) {
            const wordsPerMinute = 200; // Average reading speed
            const wordCount = text.split(/\s+/).length;
            const minutes = Math.ceil(wordCount / wordsPerMinute);
            return minutes < 1 ? 1 : minutes;
        }
        
        function getCategoryName(id) {
            const category = categoryConfig.find(c => c.id === id);
            return category ? category.name : (categoryNames[id] || 'Bilinmeyen');
        }

    