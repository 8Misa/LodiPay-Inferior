// mobile-app-guide.js

// Populate user info dynamically
function updateUserInfo(user) {
    if (!user) return;
    document.getElementById("user-avatar").textContent = user.avatar || "";
    document.getElementById("user-name").textContent = user.name || "";
    document.getElementById("user-tier").textContent = user.tier || "";
}

// Setup download button actions
function setupDownloadButtons() {
    const appStoreBtn = document.querySelector(".download-btn .fa-apple")?.closest(".download-btn");
    const playStoreBtn = document.querySelector(".download-btn .fa-google-play")?.closest(".download-btn");

    if (appStoreBtn) {
        appStoreBtn.addEventListener("click", () => {
            window.open("https://www.apple.com/app-store/", "_blank");
        });
    }

    if (playStoreBtn) {
        playStoreBtn.addEventListener("click", () => {
            window.open("https://play.google.com/store", "_blank");
        });
    }

    // CTA section download button
    const ctaBtn = document.getElementById("download-app");
    if (ctaBtn) {
        ctaBtn.addEventListener("click", () => {
            // You can redirect to a preferred page or app store
            window.open("https://lodipay.com/download", "_blank");
        });
    }
}

// Optionally populate app preview balance dynamically
function updateAppPreview(balance = 0) {
    const balanceElement = document.querySelector(".phone-content div div:nth-child(2)");
    if (balanceElement) {
        balanceElement.textContent = `₱${balance.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
}

// Initialize mobile app guide page
function initMobileAppGuide(user = null, previewBalance = 0) {
    updateUserInfo(user);
    setupDownloadButtons();
    updateAppPreview(previewBalance);
}

// Run on page load
window.addEventListener("DOMContentLoaded", () => initMobileAppGuide());
