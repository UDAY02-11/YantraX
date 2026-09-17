export interface NewsletterResult {
  success: boolean;
  message: string;
}

function delay<T>(data: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const newsletterService = {
  async subscribe(email: string): Promise<NewsletterResult> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return delay({ success: false, message: 'Please enter a valid email address.' });
    }
    return delay({
      success: true,
      message: 'You are subscribed! Check your inbox for a welcome offer.',
    });
  },
};
