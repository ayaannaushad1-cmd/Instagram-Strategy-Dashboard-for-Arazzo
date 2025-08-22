// Instagram Strategy Dashboard JavaScript for Arazzo
class InstagramDashboard {
    constructor() {
        this.data = {};
        this.charts = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
    }

    async loadData() {
        // Data structure for Arazzo with pricing data from JSON
        this.data = {
            brand_name: "Arazzo",
            posting_frequency: {
                weekly_posts: 3,
                weekly_stories: 10,
                weekly_reels: 2,
                weekly_carousels: 1,
                daily_stories: 1.4
            },
            // Pricing plans from the JSON data
            pricing_plans: [
                {
                    name: "Content Lite",
                    price: "₹15,000",
                    period: "per month",
                    recommended: false,
                    services: [
                        "Content Strategy",
                        "Graphic Design",
                        "Video Editing",
                        "2 Shoot days/Month",
                        "Maximum of 20 contents pushed out per month"
                    ],
                    perks: ["On-page SEO content generation"],
                    notes: ["Special location, studio charges separately billed"],
                    show_cta: false
                },
                {
                    name: "Digital Lite",
                    price: "₹25,000",
                    period: "per month",
                    recommended: true,
                    services: [
                        "Content Strategy",
                        "Graphic Design", 
                        "Video Editing",
                        "3x Shoot Days/Month",
                        "Maximum of 30 contents pushed out per month"
                    ],
                    perks: [
                        "Website optimisation and off-page SEO activities",
                        "Shoots outside of Kolkata can be accommodated",
                        "Online engagement support",
                        "Ad creation and support upto INR 1lacs/quarter"
                    ],
                    notes: ["Travel and stay not included"],
                    show_cta: false
                },
                {
                    name: "Digital Pro - Intensive Ads",
                    price: "₹40,000",
                    period: "per month",
                    recommended: false,
                    services: [
                        "Content Strategy",
                        "Graphic Design",
                        "Video Editing",
                        "5x Shoot Days/Month", 
                        "Maximum of 40 contents pushed out per month"
                    ],
                    perks: [
                        "Shoots outside of Kolkata can be accommodated",
                        "Travel and stay included",
                        "Online engagement support",
                        "Ad creation and support with no budget limit",
                        "24*7 risk management and reputation building"
                    ],
                    notes: [],
                    show_cta: false
                }
            ],
            // Measurement metrics from JSON data
            measurement_metrics: {
                awareness_metrics: {
                    title: "Awareness Metrics for Arazzo",
                    monthly_reach_target: "10k+",
                    monthly_follower_growth: "7%", 
                    monthly_impressions: "15k+"
                },
                engagement_metrics: {
                    title: "Engagement Metrics for Arazzo",
                    target_engagement_rate: "2.8%",
                    reshare_target: "5 per post",
                    video_completion_rate: "45-55%"
                },
                conversion_metrics: {
                    title: "Conversion Metrics for Arazzo (if running small budget paid ad)",
                    monthly_dm_inquiries: "50+",
                    qualified_leads_month: "25+", 
                    profile_visit_rate: "8%"
                }
            },
            competitor_data: {
                "Sreepriya Exports": {
                    followers_est: 15000,
                    posting_frequency_weekly: 4,
                    engagement_rate: 1.8,
                    content_pillars: ["Haute Couture Embroidery", "Bridal Collections", "Traditional Craftsmanship", "Workshop BTS"],
                    top_formats: ["Carousel Posts", "Static Photos", "Reels"],
                    sustainability_focus: "Medium",
                    brand_positioning: "Traditional Luxury Embroidery House",
                    target_market: "Indian Bridal & Global Fashion Houses"
                },
                "Milaaya Embroideries": {
                    followers_est: 45000,
                    posting_frequency_weekly: 6,
                    engagement_rate: 2.1,
                    content_pillars: ["Luxury Hand Embroidery", "Artisan Welfare", "Sustainability", "Celebrity Features", "Global Collaborations"],
                    top_formats: ["Reels", "Carousel Posts", "Stories"],
                    sustainability_focus: "High",
                    brand_positioning: "Global Luxury Embroidery Leader",
                    target_market: "International Luxury Brands & Haute Couture"
                },
                "Marsil Embroideries": {
                    followers_est: 25000,
                    posting_frequency_weekly: 3,
                    engagement_rate: 1.5,
                    content_pillars: ["Timeless Embroidery", "Heritage Craft", "Modern Applications", "Quality Focus"],
                    top_formats: ["Static Photos", "Carousel Posts", "Reels"],
                    sustainability_focus: "Medium",
                    brand_positioning: "Heritage Craft with Modern Standards",
                    target_market: "Fashion Houses & Interior Design"
                },
                "Ricamour Embroideries": {
                    followers_est: 35000,
                    posting_frequency_weekly: 5,
                    engagement_rate: 1.9,
                    content_pillars: ["Custom Embroidery", "Designer Education", "Luxury Positioning", "Process Documentation"],
                    top_formats: ["Reels", "Carousel Posts", "Long-form Videos"],
                    sustainability_focus: "Low",
                    brand_positioning: "Luxury Custom Embroidery Specialists",
                    target_market: "Fashion Designers & Luxury Brands"
                },
                "Barira Fashion": {
                    followers_est: 8000,
                    posting_frequency_weekly: 2,
                    engagement_rate: 2.3,
                    content_pillars: ["Hand Embroidery", "Small Batch Production", "Traditional Techniques", "Personal Stories"],
                    top_formats: ["Static Photos", "Stories", "Carousel Posts"],
                    sustainability_focus: "Medium",
                    brand_positioning: "Artisanal Hand Embroidery",
                    target_market: "Niche Luxury & Individual Buyers"
                }
            },
            format_performance: {
                "Reels": { engagement_rate: 1.66, usage_frequency: "2 per week", best_for: "Process videos & techniques", content_examples: "Time-lapse embroidery creation" },
                "Carousel Posts": { engagement_rate: 0.99, usage_frequency: "1 per week", best_for: "Product showcases & tutorials", content_examples: "Before/after transformations" },
                "Static Photos": { engagement_rate: 0.70, usage_frequency: "Primary format", best_for: "Finished pieces & brand shots", content_examples: "Hero product photography" },
                "Stories": { engagement_rate: 1.60, usage_frequency: "10 per week", best_for: "Daily updates & behind-scenes", content_examples: "Workshop candid moments" }
            },
            benchmarks: {
                "Industry Average": { Weekly_Feed_Posts: "3-5 posts", Daily_Stories: "1-2 stories", Weekly_Reels: "2-3 reels", Weekly_Carousels: "1-2 carousels", Monthly_Follower_Growth: "5-7%", Average_Engagement_Rate: "1.8%", Video_Completion_Rate: "45-60%", Save_Rate: "8-12%" },
                "Luxury Fashion Benchmark": { Weekly_Feed_Posts: "4-6 posts", Daily_Stories: "2-3 stories", Weekly_Reels: "3-4 reels", Weekly_Carousels: "2-3 carousels", Monthly_Follower_Growth: "8.1%", Average_Engagement_Rate: "2.6%", Video_Completion_Rate: "65-75%", Save_Rate: "15-20%" },
                "Arazzo Target": { Weekly_Feed_Posts: "3 posts", Daily_Stories: "1.4 stories", Weekly_Reels: "2 reels", Weekly_Carousels: "1 carousel", Monthly_Follower_Growth: "12%", Average_Engagement_Rate: "2.8%", Video_Completion_Rate: "70-80%", Save_Rate: "22%" }
            },
            // Updated grid strategy with only ONE reel and format changes as requested
            grid_strategy: {
                position_1: { 
                    position: "Top Left", 
                    goal: "Build Trust & Authenticity", 
                    pillar: "Artisan Stories", 
                    format: "Carousel", 
                    opening_hook: "Meet Meera, whose hands have been creating magic for 20+ years...", 
                    caption: "Meet Meera, a master embroidery artisan whose delicate hands have been weaving dreams into fabric for over two decades. From her small village workshop, she creates intricate beadwork that adorns luxury gowns worn on red carpets worldwide.", 
                    hashtags: "#ArtisanStory #HandEmbroidery #LuxuryCraftsmanship #SustainableFashion #TraditionalCraft #ArazzoArtisan" 
                },
                position_2: { 
                    position: "Top Center", 
                    goal: "Showcase Process Expertise", 
                    pillar: "Technique Mastery", 
                    format: "Reel", 
                    opening_hook: "Watch 48 hours of embroidery magic in 15 seconds...", 
                    caption: "48 hours of meticulous handwork condensed into pure magic ✨ This French knot technique requires 2,000+ individual stitches to create just one flower motif. Our artisans use silk threads from sustainable sources.", 
                    hashtags: "#EmbroideryProcess #HandEmbroidery #LuxuryProcess #CraftVideo #BehindTheScenes #ArazzoProcess" 
                },
                position_3: { 
                    position: "Top Right", 
                    goal: "Drive Product Interest", 
                    pillar: "Product Showcase", 
                    format: "Static Photo", 
                    opening_hook: "When embroidery becomes poetry written in thread and gold ✨", 
                    caption: "Poetry written in thread and 24k gold. This hand-embroidered panel features over 15,000 French knots and took our master artisan 6 weeks to complete. Crafted using GOTS-certified organic silk.", 
                    hashtags: "#LuxuryEmbroidery #SustainableLuxury #OrganicSilk #RecycledGold #ArazzoArt #LuxuryCraft" 
                },
                position_4: { 
                    position: "Middle Left", 
                    goal: "Align with Sustainability Values", 
                    pillar: "Environmental Impact", 
                    format: "Static Photo", 
                    opening_hook: "From plastic waste to luxury fashion - the circular economy in action 🔄", 
                    caption: "From ocean plastic to runway luxury - witness the circular economy in action. These iridescent sequins were once discarded plastic bottles, now transformed into sustainable embellishments.", 
                    hashtags: "#CircularFashion #UpcycledLuxury #ZeroWaste #OceanPlastic #ArazzoSustainable #EcoLuxury" 
                },
                position_5: { 
                    position: "Middle Center", 
                    goal: "Educational Engagement", 
                    pillar: "Technique Education", 
                    format: "Carousel", 
                    opening_hook: "Master the art of French knots with this step-by-step guide 🎓", 
                    caption: "Master one of embroidery's most elegant techniques! French knots add incredible texture and dimension to luxury embroidery. Here's how our artisans create these tiny masterpieces.", 
                    hashtags: "#EmbroideryTutorial #FrenchKnots #LearnEmbroidery #EmbroideryTechnique #ArazzoMasterclass #CraftEducation" 
                },
                position_6: { 
                    position: "Middle Right", 
                    goal: "Humanize Brand", 
                    pillar: "Workshop Culture", 
                    format: "Static Photo", 
                    opening_hook: "Behind every Arazzo piece: a community of passionate artisans ☀️", 
                    caption: "Behind luxury embroidery lies a community of passionate artisans. Our workshop environment promotes creativity, collaboration, and cultural exchange. Fair wages, healthcare benefits, and flexible hours ensure our team thrives.", 
                    hashtags: "#AtelierLife #EthicalProduction #FairWages #ArtisanWelfare #ArazzoTeam #WorkshopCulture" 
                },
                position_7: { 
                    position: "Bottom Left", 
                    goal: "Cultural Connection", 
                    pillar: "Heritage Preservation", 
                    format: "Static Photo", 
                    opening_hook: "Ancient techniques meet modern innovation - tradition evolves 🏛️", 
                    caption: "500-year-old techniques enhanced by modern innovation. While we honor traditional Zardozi and Chikankari methods passed down through generations, we've integrated eco-friendly materials.", 
                    hashtags: "#HeritageInnovation #TraditionalCraft #ModernTechniques #CulturalPreservation #ArazzoHeritage #ZardoziArt" 
                },
                position_8: { 
                    position: "Bottom Center", 
                    goal: "Social Proof", 
                    pillar: "Client Showcase", 
                    format: "Static Photo", 
                    opening_hook: "From our atelier to the world's most prestigious runways ✨", 
                    caption: "From sketch to runway - witness our embroidery journey! This hand-beaded collection took 300+ hours to complete and features sustainable crystals and organic silk. See the transformation from concept to red carpet.", 
                    hashtags: "#LuxuryFashion #ClientShowcase #CoutureEmbroidery #SustainableLuxury #ArazzoPrestige #RedCarpet" 
                },
                position_9: { 
                    position: "Bottom Right", 
                    goal: "Quality Emphasis", 
                    pillar: "Material Excellence", 
                    format: "Static Photo", 
                    opening_hook: "When you touch luxury, you feel the difference. Every. Single. Thread. 🤏", 
                    caption: "Feel the luxury before you see it. These are OEKO-TEX certified silk threads with 120 denier count - the finest available. Each strand is tested for strength and environmental safety.", 
                    hashtags: "#MaterialQuality #LuxuryMaterials #SilkThread #OEKOTEX #ArazzoQuality #PremiumThreads" 
                }
            },
            // Updated posting schedule for 3 posts per week, 10 stories per week, 2 reels per week
            posting_schedule: [
                { day: "Monday", format: "Reel", pillar: "Technique Mastery", concept: "Time-lapse embroidery creation", cta: "Save for technique inspiration!" },
                { day: "Tuesday", format: "Stories Only", pillar: "Workshop Culture", concept: "Daily workshop moments", cta: "Stories content" },
                { day: "Wednesday", format: "Static Photo", pillar: "Product Showcase", concept: "Hero shot of finished piece", cta: "Double-tap if you love luxury craftsmanship" },
                { day: "Thursday", format: "Stories Only", pillar: "Artisan Stories", concept: "Behind-the-scenes glimpses", cta: "Stories content" },
                { day: "Friday", format: "Carousel", pillar: "Technique Education", concept: "Step-by-step tutorial", cta: "Save this tutorial!" },
                { day: "Saturday", format: "Stories Only", pillar: "Heritage Preservation", concept: "Traditional techniques showcase", cta: "Stories content" },
                { day: "Sunday", format: "Reel", pillar: "Environmental Impact", concept: "Sustainability process", cta: "Share to spread awareness" },
                { day: "Monday", format: "Stories Only", pillar: "Material Excellence", concept: "Quality focus content", cta: "Stories content" },
                { day: "Tuesday", format: "Static Photo", pillar: "Workshop Culture", concept: "Artisan at work", cta: "Visit our workshop link in bio" },
                { day: "Wednesday", format: "Stories Only", pillar: "Client Showcase", concept: "Behind runway scenes", cta: "Stories content" },
                { day: "Thursday", format: "Static Photo", pillar: "Heritage Preservation", concept: "Traditional craft focus", cta: "Learn about our heritage" },
                { day: "Friday", format: "Stories Only", pillar: "Product Showcase", concept: "Work in progress updates", cta: "Stories content" },
                { day: "Saturday", format: "Stories Only", pillar: "Environmental Impact", concept: "Sustainability initiatives", cta: "Stories content" },
                { day: "Sunday", format: "Stories Only", pillar: "Artisan Stories", concept: "Weekend artisan life", cta: "Stories content" }
            ],
            roadmap: {
                "Month 1": { focus: "Foundation & Awareness", objectives: ["Establish Arazzo brand voice and visual identity", "Build artisan storytelling content", "Launch sustainability series", "Optimize 3 posts/week schedule"] },
                "Month 2": { focus: "Engagement & Education", objectives: ["Increase tutorial and educational content", "Develop client showcase series", "Expand hashtag reach", "Launch artisan welfare campaigns"] },
                "Month 3": { focus: "Growth & Conversion", objectives: ["Scale content production to target metrics", "Implement advanced analytics", "Launch premium content series", "Optimize for lead generation and inquiries"] }
            }
        };
    }

    setupEventListeners() {
        // Use a more robust approach to ensure DOM elements are available
        const setupTabs = () => {
            const tabButtons = document.querySelectorAll('.tab-btn');
            console.log('Found tab buttons:', tabButtons.length);
            
            tabButtons.forEach((btn, index) => {
                console.log(`Setting up tab ${index}:`, btn.dataset.tab);
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Tab clicked:', btn.dataset.tab);
                    this.switchTab(btn.dataset.tab);
                });
            });

            // Competitor filters
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.filterCompetitors(btn.dataset.filter);
                });
            });

            // Modal handling
            const modalClose = document.querySelector('.modal-close');
            if (modalClose) {
                modalClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeModal();
                });
            }

            const modal = document.querySelector('.modal');
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('modal')) {
                        this.closeModal();
                    }
                });
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeModal();
            });
        };

        // Try to set up immediately, or wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupTabs);
        } else {
            setupTabs();
        }
    }

    switchTab(tabId) {
        console.log('Switching to tab:', tabId);
        
        // Update tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        console.log('Found tab buttons for switching:', tabButtons.length);
        
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
                console.log('Activated tab button:', tabId);
            }
        });

        // Update tab content
        const tabContents = document.querySelectorAll('.tab-content');
        console.log('Found tab contents:', tabContents.length);
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
                console.log('Activated tab content:', tabId);
            }
        });

        // Render specific content for the active tab
        setTimeout(() => {
            console.log('Rendering content for tab:', tabId);
            switch(tabId) {
                case 'executive':
                    this.renderExecutiveSummary();
                    break;
                case 'competitors':
                    this.renderCompetitors();
                    break;
                case 'formats':
                    this.renderFormatPerformance();
                    break;
                case 'grid':
                    this.renderInstagramGrid();
                    break;
                case 'schedule':
                    this.renderPostingSchedule();
                    break;
                case 'pricing':
                    this.renderPricing();
                    break;
            }
        }, 100);
    }

    renderDashboard() {
        console.log('Initial dashboard render');
        // Initial render of executive summary
        setTimeout(() => {
            this.renderExecutiveSummary();
        }, 100);
    }

    renderExecutiveSummary() {
        console.log('Rendering executive summary');
        // Render benchmark comparison chart
        const ctx = document.getElementById('benchmarkChart');
        if (ctx && !this.charts.benchmarkChart) {
            console.log('Creating benchmark chart');
            this.charts.benchmarkChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Weekly Posts', 'Engagement Rate', 'Follower Growth', 'Save Rate'],
                    datasets: [
                        {
                            label: 'Industry Average',
                            data: [4, 1.8, 6, 10],
                            backgroundColor: '#1FB8CD',
                            borderColor: '#1FB8CD',
                            borderWidth: 1
                        },
                        {
                            label: 'Luxury Fashion',
                            data: [5, 2.6, 8.1, 17.5],
                            backgroundColor: '#FFC185',
                            borderColor: '#FFC185',
                            borderWidth: 1
                        },
                        {
                            label: 'Arazzo Target',
                            data: [3, 2.8, 12, 22],
                            backgroundColor: '#B4413C',
                            borderColor: '#B4413C',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Arazzo Performance Benchmarks Comparison'
                        },
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    renderCompetitors() {
        console.log('Rendering competitors');
        const container = document.getElementById('competitorGrid');
        if (!container) {
            console.error('Competitor grid container not found');
            return;
        }

        container.innerHTML = '';

        Object.entries(this.data.competitor_data).forEach(([name, data]) => {
            const card = document.createElement('div');
            card.className = 'competitor-card';
            card.dataset.sustainability = data.sustainability_focus.toLowerCase();
            card.dataset.engagement = data.engagement_rate >= 2.0 ? 'high' : 'normal';

            card.innerHTML = `
                <div class="competitor-header">
                    <h3 class="competitor-name">${name}</h3>
                    <span class="sustainability-badge ${data.sustainability_focus.toLowerCase()}">${data.sustainability_focus}</span>
                </div>
                <div class="competitor-metrics">
                    <div class="metric-item">
                        <span class="metric-value">${(data.followers_est / 1000).toFixed(0)}K</span>
                        <div class="metric-label">Followers</div>
                    </div>
                    <div class="metric-item">
                        <span class="metric-value">${data.posting_frequency_weekly}/week</span>
                        <div class="metric-label">Posting Frequency</div>
                    </div>
                    <div class="metric-item">
                        <span class="metric-value">${data.engagement_rate}%</span>
                        <div class="metric-label">Engagement Rate</div>
                    </div>
                    <div class="metric-item">
                        <span class="metric-value">${data.top_formats.length}</span>
                        <div class="metric-label">Top Formats</div>
                    </div>
                </div>
                <div class="content-pillars-list">
                    <h4>Content Pillars</h4>
                    <div class="pillars-tags">
                        ${data.content_pillars.map(pillar => `<span class="pillar-tag">${pillar}</span>`).join('')}
                    </div>
                </div>
                <div class="brand-positioning">
                    <p><strong>Positioning:</strong> ${data.brand_positioning}</p>
                    <p><strong>Target:</strong> ${data.target_market}</p>
                </div>
            `;

            container.appendChild(card);
        });
    }

    filterCompetitors(filter) {
        console.log('Filtering competitors by:', filter);
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        const activeFilter = document.querySelector(`[data-filter="${filter}"]`);
        if (activeFilter) {
            activeFilter.classList.add('active');
        }

        // Filter competitor cards
        const cards = document.querySelectorAll('.competitor-card');
        cards.forEach(card => {
            let show = true;
            
            switch(filter) {
                case 'high-engagement':
                    show = card.dataset.engagement === 'high';
                    break;
                case 'sustainable':
                    show = card.dataset.sustainability === 'high';
                    break;
                case 'all':
                default:
                    show = true;
                    break;
            }

            card.style.display = show ? 'block' : 'none';
        });
    }

    renderFormatPerformance() {
        console.log('Rendering format performance');
        const ctx = document.getElementById('formatChart');
        if (ctx && !this.charts.formatChart) {
            const formats = Object.keys(this.data.format_performance);
            const engagementRates = formats.map(format => this.data.format_performance[format].engagement_rate);

            this.charts.formatChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: formats,
                    datasets: [{
                        data: engagementRates,
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Engagement Rate by Format - Arazzo Strategy'
                        },
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
        }
    }

    renderInstagramGrid() {
        console.log('Rendering Instagram grid');
        const container = document.getElementById('instagramGrid');
        if (!container) {
            console.error('Instagram grid container not found');
            return;
        }

        container.innerHTML = '';

        Object.entries(this.data.grid_strategy).forEach(([key, post], index) => {
            const gridPost = document.createElement('div');
            gridPost.className = 'grid-post';
            gridPost.dataset.position = index + 1;
            
            // Add specific format class for styling
            let formatClass = 'photo';
            if (post.format.toLowerCase().includes('reel')) formatClass = 'reel';
            else if (post.format.toLowerCase().includes('carousel')) formatClass = 'carousel';
            
            gridPost.innerHTML = `
                <div class="post-preview">
                    <div class="post-format ${formatClass}">${post.format}</div>
                    <div class="post-hook">${post.opening_hook.substring(0, 50)}...</div>
                    <div class="post-pillar">${post.pillar}</div>
                </div>
            `;

            gridPost.addEventListener('click', () => this.openPostModal(post));
            container.appendChild(gridPost);
        });

        // Render grid distribution chart
        this.renderGridDistribution();
    }

    renderGridDistribution() {
        console.log('Rendering grid distribution chart');
        const ctx = document.getElementById('gridDistributionChart');
        if (ctx && !this.charts.gridDistributionChart) {
            // Count formats in the updated grid
            const formats = { 'Reel': 0, 'Carousel': 0, 'Static Photo': 0 };
            
            Object.values(this.data.grid_strategy).forEach(post => {
                if (post.format.toLowerCase().includes('reel')) {
                    formats['Reel']++;
                } else if (post.format.toLowerCase().includes('carousel')) {
                    formats['Carousel']++;
                } else {
                    formats['Static Photo']++;
                }
            });

            console.log('Grid format distribution:', formats);

            this.charts.gridDistributionChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(formats),
                    datasets: [{
                        data: Object.values(formats),
                        backgroundColor: ['#B4413C', '#1FB8CD', '#5D878F'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Arazzo 3×3 Grid Format Distribution'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    openPostModal(post) {
        console.log('Opening post modal for:', post.position);
        const modal = document.getElementById('postModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        if (!modal || !title || !body) {
            console.error('Modal elements not found');
            return;
        }

        title.textContent = `${post.position} - ${post.pillar}`;
        
        body.innerHTML = `
            <div class="post-detail-grid">
                <div class="detail-section">
                    <h4>Goal & Strategy</h4>
                    <div class="detail-content">
                        <p><strong>Goal:</strong> ${post.goal}</p>
                        <p><strong>Format:</strong> ${post.format}</p>
                        <p><strong>Content Pillar:</strong> ${post.pillar}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Opening Hook</h4>
                    <div class="detail-content">"${post.opening_hook}"</div>
                </div>
                
                <div class="detail-section">
                    <h4>Full Caption</h4>
                    <div class="detail-content">${post.caption}</div>
                </div>
                
                <div class="detail-section">
                    <h4>Hashtags</h4>
                    <div class="hashtags-container">
                        <div class="hashtags">${post.hashtags}</div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    closeModal() {
        const modal = document.getElementById('postModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    renderPostingSchedule() {
        console.log('Rendering posting schedule');
        // Render 14-day calendar
        this.renderCalendar();
        this.renderRoadmap();
    }

    renderCalendar() {
        const container = document.getElementById('calendarContainer');
        if (!container) return;

        container.innerHTML = '';

        // Create a 14-day calendar based on new schedule
        for (let i = 0; i < 14; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = `Day ${i + 1}`;
            
            const dayPosts = document.createElement('div');
            dayPosts.className = 'day-posts';
            
            // Add posts for this day based on updated schedule
            const scheduleItem = this.data.posting_schedule[i];
            if (scheduleItem && scheduleItem.format !== 'Stories Only') {
                const post = document.createElement('div');
                post.className = 'calendar-post';
                
                // Add specific format class for styling
                if (scheduleItem.format.toLowerCase().includes('reel')) post.classList.add('reel');
                else if (scheduleItem.format.toLowerCase().includes('carousel')) post.classList.add('carousel');
                else post.classList.add('photo');
                
                post.textContent = scheduleItem.format;
                dayPosts.appendChild(post);
            }
            
            // Always add stories indicator
            const storiesPost = document.createElement('div');
            storiesPost.className = 'calendar-post';
            storiesPost.style.background = '#5D878F';
            storiesPost.textContent = 'Stories';
            dayPosts.appendChild(storiesPost);
            
            dayDiv.appendChild(dayNumber);
            dayDiv.appendChild(dayPosts);
            container.appendChild(dayDiv);
        }
    }

    renderRoadmap() {
        const container = document.getElementById('roadmapTimeline');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(this.data.roadmap).forEach(([month, data]) => {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'roadmap-month';
            
            monthDiv.innerHTML = `
                <div class="month-header">
                    <h4 class="month-title">${month}</h4>
                    <span class="month-focus">${data.focus}</span>
                </div>
                <ul class="month-objectives">
                    ${data.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            `;
            
            container.appendChild(monthDiv);
        });
    }

    renderPricing() {
        console.log('Rendering pricing');
        const container = document.getElementById('pricingPlans');
        if (!container) {
            console.error('Pricing plans container not found');
            return;
        }

        container.innerHTML = '';

        this.data.pricing_plans.forEach(plan => {
            const planCard = document.createElement('div');
            planCard.className = `pricing-card${plan.recommended ? ' recommended' : ''}`;
            
            planCard.innerHTML = `
                <div class="pricing-header">
                    <h3 class="plan-name">${plan.name}</h3>
                    <div class="plan-price">${plan.price}</div>
                    <p class="plan-period">${plan.period}</p>
                </div>
                <div class="pricing-content">
                    <div class="services-list">
                        <h4 class="list-title">Services Included</h4>
                        <ul>
                            ${plan.services.map(service => `<li>${service}</li>`).join('')}
                        </ul>
                    </div>
                    ${plan.perks.length > 0 ? `
                    <div class="perks-list">
                        <h4 class="list-title">Additional Perks</h4>
                        <ul>
                            ${plan.perks.map(perk => `<li>${perk}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                    ${plan.notes.length > 0 ? `
                    <div class="notes-list">
                        <h4 class="list-title">Important Notes</h4>
                        <ul>
                            ${plan.notes.map(note => `<li>${note}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                </div>
            `;
            
            container.appendChild(planCard);
        });
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Arazzo dashboard');
    window.dashboard = new InstagramDashboard();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstagramDashboard;
}
