// src/utils/reviews.ts

export interface GoogleReview {
  reviewer: {
    displayName: string;
  };
  starRating: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
  name?: string;
}

/**
 * Filter reviews by keywords found in the comment text
 * @param reviews - Array of Google reviews
 * @param keywords - Array of keywords to search for (case-insensitive)
 * @param limit - Maximum number of reviews to return (default: 3)
 * @returns Filtered array of reviews
 */
export function filterReviewsByKeywords(
  reviews: GoogleReview[],
  keywords: string[],
  limit: number = 3
): GoogleReview[] {
  if (!reviews || reviews.length === 0) {
    return [];
  }

  // Filter out reviews without comments
  const reviewsWithComments = reviews.filter(r => r.comment && r.comment.trim().length > 0);

  // If no keywords provided, return random selection
  if (!keywords || keywords.length === 0) {
    return getRandomReviews(reviewsWithComments, limit);
  }

  // Convert keywords to lowercase for case-insensitive matching
  const lowerKeywords = keywords.map(k => k.toLowerCase());

  // Filter reviews that contain any of the keywords
  const filtered = reviewsWithComments.filter(review => {
    const comment = (review.comment || '').toLowerCase();
    return lowerKeywords.some(keyword => comment.includes(keyword));
  });

  // If we have enough filtered reviews, return them
  if (filtered.length >= limit) {
    return filtered.slice(0, limit);
  }

  // If not enough matches, supplement with random reviews
  const remaining = limit - filtered.length;
  const otherReviews = reviewsWithComments.filter(r => !filtered.includes(r));
  const randomOthers = getRandomReviews(otherReviews, remaining);

  return [...filtered, ...randomOthers];
}

/**
 * Get random reviews from the array
 * @param reviews - Array of reviews
 * @param count - Number of reviews to return
 * @returns Random selection of reviews
 */
export function getRandomReviews(
  reviews: GoogleReview[],
  count: number
): GoogleReview[] {
  if (!reviews || reviews.length === 0) {
    return [];
  }

  const shuffled = [...reviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, reviews.length));
}

/**
 * Filter reviews for area pages
 * Looks for area name and related location keywords in review comments
 */
export function filterReviewsForArea(
  reviews: GoogleReview[],
  areaName: string,
  nearbyLocations: string[] = [],
  limit: number = 3
): GoogleReview[] {
  const keywords = [areaName, ...nearbyLocations];
  return filterReviewsByKeywords(reviews, keywords, limit);
}

/**
 * Filter reviews for service pages
 * Looks for service-related keywords in review comments
 */
export function filterReviewsForService(
  reviews: GoogleReview[],
  serviceName: string,
  limit: number = 3
): GoogleReview[] {
  // Map service names to keywords that might appear in reviews
  const serviceKeywords: Record<string, string[]> = {
    "emergency": ["emergency", "flat", "blowout", "stranded", "roadside", "stuck", "puncture"],
    "mobile": ["mobile", "home", "work", "came to", "at home", "at work", "at my house"],
    "puncture": ["puncture", "flat", "repair", "leak"],
    "replacement": ["replacement", "replaced", "new tyre", "fitted"],
    "tpms": ["tpms", "sensor", "warning light"],
    "locking": ["locking", "wheel nut", "lost key"],
    "run flat": ["run flat", "runflat"],
    "balancing": ["balance", "balancing", "vibration"],
    "all": [] // All services - return random reviews
  };

  // Find keywords based on service name
  const serviceLower = serviceName.toLowerCase();
  let keywords: string[] = [];

  for (const [key, values] of Object.entries(serviceKeywords)) {
    if (serviceLower.includes(key)) {
      keywords = [...keywords, ...values];
      break;
    }
  }

  return filterReviewsByKeywords(reviews, keywords, limit);
}
