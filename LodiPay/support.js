// support.js

document.addEventListener("DOMContentLoaded", () => {

    // ---------- FAQ Toggle ----------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            answer.classList.toggle('open');
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.classList.remove('open');
                }
            });
        });
    });

    // ---------- Category Cards ----------
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryContents = document.querySelectorAll('.category-content');
    const backButtons = document.querySelectorAll('.category-back');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            if (!category) return;
            categoryContents.forEach(content => content.style.display = 'none');
            const selectedContent = document.getElementById(`${category}-content`);
            if (selectedContent) selectedContent.style.display = 'block';
        });
    });

    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.closest('.category-content');
            if (content) content.style.display = 'none';
        });
    });

    // ---------- Search Functionality ----------
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const filter = e.target.value.toLowerCase();
            const allArticles = document.querySelectorAll('.category-articles .article-item');

            allArticles.forEach(article => {
                const title = article.querySelector('.article-title')?.textContent.toLowerCase() || '';
                const excerpt = article.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
                article.style.display = (title.includes(filter) || excerpt.includes(filter)) ? 'block' : 'none';
            });
        });
    }

    // ---------- Feedback Button ----------
    const feedbackBtn = document.getElementById('feedback-button');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            alert('Thank you for your feedback!');
        });
    }

    // ---------- Contact Us Buttons ----------
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const btn = card.querySelector('.contact-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (card.classList.contains('chat')) {
                alert('Opening live chat...');
                // You can later integrate your chat widget here
            } else if (card.classList.contains('email')) {
                window.location.href = 'mailto:support@lodipay.com';
            } else if (card.classList.contains('phone')) {
                window.location.href = 'tel:18005634729'; // 1-800-LODIPAY
            }
        });
    });

    // ---------- User Avatar & Name ----------
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    if (userAvatar) userAvatar.textContent = '';
    if (userName) userName.textContent = '';
});
