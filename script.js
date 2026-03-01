document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const authModal = document.getElementById('auth-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const loginTriggers = document.querySelectorAll('.login-trigger');
    const authTabs = document.querySelectorAll('.auth-tab');
    const downloadBtns = document.querySelectorAll('.download-notes');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Modal Functionality
    const openModal = () => {
        if (authModal) {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    loginTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    modalOverlay?.addEventListener('click', closeModal);

    // Tab Switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Delayed Initial Popup (Once per session)
    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            openModal();
            sessionStorage.setItem('popupShown', 'true');
        }, 3000); // 3 seconds delay for initial "WOW" effect
    }

    // Mock Actions - Notes Click triggers Modal
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.course-card, .about-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chatbot Functionality
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const quickReplies = document.querySelectorAll('.quick-reply-btn');

    const toggleChat = () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    };

    chatToggle?.addEventListener('click', toggleChat);
    chatClose?.addEventListener('click', toggleChat);

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const getBotResponse = (input) => {
        const query = input.toLowerCase();

        if (query.includes('course') || query.includes('program')) {
            return "We offer courses in BCC (Basics), DWD (Web Design), Python, DIT (Diploma), Graphics, and Tally Prime. Which one interests you?";
        } else if (query.includes('admission')) {
            return "You can enroll directly through our website by clicking the 'Enroll Now' button, or visit our center in Govindpuri, Delhi.";
        } else if (query.includes('duration') || query.includes('time')) {
            return "Course durations range from 3 months to 1 year depending on the program. BCC is 3 months, while DIT is a 1-year diploma.";
        } else if (query.includes('contact') || query.includes('where') || query.includes('location')) {
            return "We are located at Govindpuri, Kalkaji, New Delhi. You can also email us at info@devaashi.edu.";
        } else if (query.includes('fee') || query.includes('price') || query.includes('cost')) {
            return "Our fees are very competitive. For exact fee structure of specific courses, please provide your contact number, and our counselor will call you.";
        } else if (query.includes('hello') || query.includes('hi')) {
            return "Hello! How can I assist you with your tech education today?";
        }

        return "I'm not sure about that. Would you like to talk to our human counselor? Call us at our center for more details!";
    };

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';

            setTimeout(() => {
                const response = getBotResponse(text);
                addMessage(response, 'bot');
            }, 800);
        }
    };

    chatSend?.addEventListener('click', handleSend);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Handle Quick Replies
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply-btn')) {
            const text = e.target.textContent;
            addMessage(text, 'user');

            setTimeout(() => {
                const response = getBotResponse(text);
                addMessage(response, 'bot');
            }, 800);
        }
    });

    // --- Three.js 3D Graphics ---
    const initThreeJS = () => {
        const bgContainer = document.getElementById('hero-canvas');
        const visualContainer = document.getElementById('canvas-3d');
        if (!bgContainer || !visualContainer) return;

        // 1. Background Particles
        const bgScene = new THREE.Scene();
        const bgCamera = new THREE.PerspectiveCamera(75, bgContainer.clientWidth / bgContainer.clientHeight, 0.1, 1000);
        const bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        bgRenderer.setSize(bgContainer.clientWidth, bgContainer.clientHeight);
        bgContainer.appendChild(bgRenderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x6D28D9,
            transparent: true,
            opacity: 0.5
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        bgScene.add(particlesMesh);
        bgCamera.position.z = 3;

        // 2. Main 3D Object (Geometric Tech Sphere)
        const visualScene = new THREE.Scene();
        const visualCamera = new THREE.PerspectiveCamera(75, visualContainer.clientWidth / visualContainer.clientHeight, 0.1, 1000);
        const visualRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        visualRenderer.setSize(visualContainer.clientWidth, visualContainer.clientHeight);
        visualContainer.appendChild(visualRenderer.domElement);

        // Core Group for complex 6D rotation
        const g6Group = new THREE.Group();
        visualScene.add(g6Group);

        const geometry = new THREE.IcosahedronGeometry(1.5, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6D28D9,
            wireframe: true,
            transparent: true,
            opacity: 1,
            emissive: 0x4C1D95,
            emissiveIntensity: 0.5
        });
        const mesh = new THREE.Mesh(geometry, material);
        g6Group.add(mesh);

        // Inner Core
        const innerGeometry = new THREE.IcosahedronGeometry(0.7, 0);
        const innerMaterial = new THREE.MeshPhongMaterial({
            color: 0xF59E0B,
            emissive: 0xF59E0B,
            emissiveIntensity: 1,
            shininess: 100
        });
        const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
        g6Group.add(innerMesh);

        // Energy Rings (the "6D" feel)
        const ringGeo = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x6D28D9, transparent: true, opacity: 0.5 });
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.5 });
        const ringMat3 = new THREE.MeshBasicMaterial({ color: 0xC4B5FD, transparent: true, opacity: 0.5 });

        const ring1 = new THREE.Mesh(ringGeo, ringMat1);
        const ring2 = new THREE.Mesh(ringGeo, ringMat2);
        const ring3 = new THREE.Mesh(ringGeo, ringMat3);

        ring2.rotation.x = Math.PI / 2;
        ring3.rotation.y = Math.PI / 4;

        g6Group.add(ring1);
        g6Group.add(ring2);
        g6Group.add(ring3);

        // Lights
        const pointLight1 = new THREE.PointLight(0x6D28D9, 3, 15);
        visualScene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xF59E0B, 3, 15);
        visualScene.add(pointLight2);

        visualScene.add(new THREE.AmbientLight(0xffffff, 0.7));

        visualCamera.position.z = 5.5;

        // Animation Loop
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.015;

            particlesMesh.rotation.y += 0.0003;
            particlesMesh.rotation.x += 0.0001;

            // Complex Group Animation
            g6Group.rotation.y += 0.007;
            g6Group.rotation.z += 0.004;

            mesh.rotation.x += 0.015;
            innerMesh.rotation.y -= 0.025;

            // Pulse Effect
            const pulse = 1 + Math.sin(time) * 0.12;
            mesh.scale.set(pulse, pulse, pulse);
            innerMesh.scale.set(1.1 - pulse / 6, 1.1 - pulse / 6, 1.1 - pulse / 6);

            // Moving Lights
            pointLight1.position.x = Math.cos(time) * 4;
            pointLight1.position.z = Math.sin(time) * 4;
            pointLight2.position.x = Math.sin(time) * 4;
            pointLight2.position.y = Math.cos(time) * 4;

            ring1.rotation.y += 0.05;
            ring2.rotation.z += 0.04;
            ring3.rotation.x += 0.03;

            bgRenderer.render(bgScene, bgCamera);
            visualRenderer.render(visualScene, visualCamera);
        };

        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            bgCamera.aspect = bgContainer.clientWidth / bgContainer.clientHeight;
            bgCamera.updateProjectionMatrix();
            bgRenderer.setSize(bgContainer.clientWidth, bgContainer.clientHeight);

            visualCamera.aspect = visualContainer.clientWidth / visualContainer.clientHeight;
            visualCamera.updateProjectionMatrix();
            visualRenderer.setSize(visualContainer.clientWidth, visualContainer.clientHeight);
        });
    };

    initThreeJS();

});
