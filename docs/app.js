// Vendor Risk Assessment Calculator
// Handles scoring, tier calculation, and UI updates

(function() {
    'use strict';

    // Configuration
    const DIMENSIONS = [
        { id: 'coEmployment', name: 'Co-Employment Risk', escalationReview: 'Employment Counsel' },
        { id: 'dataSensitivity', name: 'Data Sensitivity', escalationReview: 'Privacy/DPO' },
        { id: 'physicalSafety', name: 'Physical Safety', escalationReview: 'EHS (Environmental Health & Safety)' },
        { id: 'siteAccess', name: 'Site & Security Access', escalationReview: 'InfoSec' },
        { id: 'businessContinuity', name: 'Business Continuity', escalationReview: 'Finance' },
        { id: 'aiMlRisk', name: 'AI/ML Risk', escalationReview: 'AI Governance' }
    ];

    const TIERS = [
        { name: 'Standard', min: 0, max: 5, class: 'standard', timeline: '1-2 weeks' },
        { name: 'Enhanced', min: 6, max: 10, class: 'enhanced', timeline: '3-6 weeks' },
        { name: 'High', min: 11, max: 15, class: 'high', timeline: '6-12 weeks' },
        { name: 'Critical', min: 16, max: 18, class: 'critical', timeline: '6-12 weeks' }
    ];

    const TIER_REVIEWS = {
        standard: ['procurement'],
        enhanced: ['procurement', 'security', 'legal'],
        high: ['procurement', 'security', 'legal', 'privacy', 'executive'],
        critical: ['procurement', 'security', 'legal', 'privacy', 'executive', 'csuite']
    };

    // State
    let scores = {
        coEmployment: 0,
        dataSensitivity: 0,
        physicalSafety: 0,
        siteAccess: 0,
        businessContinuity: 0,
        aiMlRisk: 0
    };

    // DOM Elements
    const elements = {
        totalScore: document.getElementById('totalScore'),
        tierName: document.getElementById('tierName'),
        tierBadge: document.getElementById('tierBadge'),
        escalationWarnings: document.getElementById('escalationWarnings'),
        escalationList: document.getElementById('escalationList'),
        reviewsGrid: document.getElementById('reviewsGrid'),
        triggeredReviews: document.getElementById('triggeredReviews'),
        triggeredReviewsList: document.getElementById('triggeredReviewsList'),
        standardClauses: document.getElementById('standardClauses'),
        enhancedClauses: document.getElementById('enhancedClauses'),
        highRiskClauses: document.getElementById('highRiskClauses'),
        aiClauses: document.getElementById('aiClauses'),
        timelineDisplay: document.getElementById('timelineDisplay'),
        resetBtn: document.getElementById('resetBtn')
    };

    // Initialize
    function init() {
        setupSliders();
        setupResetButton();
        updateDisplay();
    }

    // Setup slider event listeners
    function setupSliders() {
        DIMENSIONS.forEach(dim => {
            const slider = document.getElementById(dim.id);
            if (slider) {
                slider.addEventListener('input', function() {
                    scores[dim.id] = parseInt(this.value, 10);
                    updateDisplay();
                });
            }
        });
    }

    // Setup reset button
    function setupResetButton() {
        elements.resetBtn.addEventListener('click', function() {
            // Reset all scores
            Object.keys(scores).forEach(key => {
                scores[key] = 0;
            });

            // Reset all sliders
            DIMENSIONS.forEach(dim => {
                const slider = document.getElementById(dim.id);
                if (slider) {
                    slider.value = 0;
                }
            });

            updateDisplay();
        });
    }

    // Calculate total score
    function calculateTotal() {
        return Object.values(scores).reduce((sum, val) => sum + val, 0);
    }

    // Determine tier based on score
    function getTier(total) {
        for (const tier of TIERS) {
            if (total >= tier.min && total <= tier.max) {
                return tier;
            }
        }
        return TIERS[0]; // Default to standard
    }

    // Get escalation triggers (dimensions with score = 3)
    function getEscalations() {
        const escalations = [];
        DIMENSIONS.forEach(dim => {
            if (scores[dim.id] === 3) {
                escalations.push({
                    dimension: dim.name,
                    review: dim.escalationReview
                });
            }
        });
        return escalations;
    }

    // Update all display elements
    function updateDisplay() {
        const total = calculateTotal();
        const tier = getTier(total);
        const escalations = getEscalations();

        // Update total score
        elements.totalScore.textContent = total;

        // Update tier display
        elements.tierName.textContent = tier.name;
        elements.tierBadge.className = 'tier-badge ' + tier.class;

        // Update dimension scores and highlighting
        updateDimensionCards();

        // Update escalation warnings
        updateEscalationWarnings(escalations);

        // Update required reviews
        updateRequiredReviews(tier, escalations);

        // Update contract clauses
        updateContractClauses(tier);

        // Update timeline
        updateTimeline(tier);
    }

    // Update dimension cards with current scores
    function updateDimensionCards() {
        DIMENSIONS.forEach(dim => {
            const score = scores[dim.id];
            const card = document.querySelector(`[data-dimension="${dim.id}"]`);
            const scoreDisplay = document.getElementById(dim.id + 'Score');

            if (scoreDisplay) {
                scoreDisplay.textContent = score;
            }

            if (card) {
                // Toggle escalated class
                if (score === 3) {
                    card.classList.add('escalated');
                } else {
                    card.classList.remove('escalated');
                }

                // Update active score description
                const descriptions = card.querySelectorAll('.score-desc');
                descriptions.forEach(desc => {
                    const descScore = parseInt(desc.getAttribute('data-score'), 10);
                    if (descScore === score) {
                        desc.classList.add('active');
                    } else {
                        desc.classList.remove('active');
                    }
                });
            }
        });
    }

    // Update escalation warnings section
    function updateEscalationWarnings(escalations) {
        if (escalations.length === 0) {
            elements.escalationWarnings.style.display = 'none';
            return;
        }

        elements.escalationWarnings.style.display = 'block';
        elements.escalationList.innerHTML = escalations.map(esc =>
            `<li><strong>${esc.dimension} = 3</strong> triggers ${esc.review} review</li>`
        ).join('');
    }

    // Update required reviews grid
    function updateRequiredReviews(tier, escalations) {
        const requiredReviews = new Set(TIER_REVIEWS[tier.class] || TIER_REVIEWS.standard);

        // Add triggered reviews
        const triggeredReviews = [];
        escalations.forEach(esc => {
            triggeredReviews.push(esc.review);
        });

        // Update review items
        const reviewItems = elements.reviewsGrid.querySelectorAll('.review-item');
        reviewItems.forEach(item => {
            const reviewId = item.getAttribute('data-review');
            if (requiredReviews.has(reviewId)) {
                item.classList.remove('inactive');
                item.classList.remove('triggered');
            } else {
                item.classList.add('inactive');
                item.classList.remove('triggered');
            }
        });

        // Update triggered reviews section
        if (triggeredReviews.length > 0) {
            elements.triggeredReviews.style.display = 'block';
            elements.triggeredReviewsList.innerHTML = triggeredReviews.map(review =>
                `<span class="triggered-item">${review}</span>`
            ).join('');
        } else {
            elements.triggeredReviews.style.display = 'none';
        }
    }

    // Update contract clauses display
    function updateContractClauses(tier) {
        const total = calculateTotal();
        const aiScore = scores.aiMlRisk;

        // Standard clauses - always active
        elements.standardClauses.classList.remove('inactive');

        // Enhanced clauses - score 6+ or any dimension = 3
        if (total >= 6 || getEscalations().length > 0) {
            elements.enhancedClauses.classList.remove('inactive');
        } else {
            elements.enhancedClauses.classList.add('inactive');
        }

        // High-risk clauses - score 11+
        if (total >= 11) {
            elements.highRiskClauses.classList.remove('inactive');
        } else {
            elements.highRiskClauses.classList.add('inactive');
        }

        // AI clauses - AI score 2+
        if (aiScore >= 2) {
            elements.aiClauses.classList.remove('inactive');
        } else {
            elements.aiClauses.classList.add('inactive');
        }
    }

    // Update timeline display
    function updateTimeline(tier) {
        const timelineValue = elements.timelineDisplay.querySelector('.timeline-value');
        if (timelineValue) {
            timelineValue.textContent = tier.timeline;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
