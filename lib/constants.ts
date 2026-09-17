export const SITE_NAME = 'MakerHub';
export const SITE_TAGLINE = 'Build. Create. Innovate.';
export const SITE_URL = 'https://makerhub.example.com';
export const SUPPORT_EMAIL = 'support@makerhub.example.com';
export const CONTACT_PHONE = '+1 (800) 555-0199';

export const FREE_SHIPPING_THRESHOLD = 499;
export const FLASH_SALE_END_OFFSET_HOURS = 5;
export const DAILY_DEALS_END_OFFSET_HOURS = 4;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/deals' },
  { label: 'Projects', href: '/projects' },
  { label: 'Learn', href: '/learn' },
] as const;

export const MEGA_MENU_GROUPS = [
  {
    title: 'Development Boards',
    items: [
      { name: 'Arduino', href: '/shop/arduino' },
      { name: 'Raspberry Pi', href: '/shop/raspberry-pi' },
      { name: 'ESP32', href: '/shop/esp32' },
      { name: 'STM32', href: '/shop/stm32' },
      { name: 'BeagleBone', href: '/shop/beaglebone' },
    ],
  },
  {
    title: 'Robotics',
    items: [
      { name: 'Robot Kits', href: '/shop/robot-kits' },
      { name: 'Motors', href: '/shop/motors' },
      { name: 'Servos', href: '/shop/servos' },
      { name: 'Chassis', href: '/shop/chassis' },
      { name: 'Wheels', href: '/shop/wheels' },
    ],
  },
  {
    title: 'Sensors & Modules',
    items: [
      { name: 'Ultrasonic', href: '/shop/ultrasonic' },
      { name: 'IMU & Gyro', href: '/shop/imu' },
      { name: 'Temperature', href: '/shop/temperature' },
      { name: 'Camera Modules', href: '/shop/camera' },
      { name: 'GPS', href: '/shop/gps' },
    ],
  },
  {
    title: 'Emerging Tech',
    items: [
      { name: 'AI & ML', href: '/shop/ai-ml' },
      { name: 'IoT', href: '/shop/iot' },
      { name: 'Drone Parts', href: '/shop/drone' },
      { name: '3D Printing', href: '/shop/3d-printing' },
      { name: 'STEM Kits', href: '/shop/stem' },
    ],
  },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Deals', href: '/deals' },
    { label: 'New Arrivals', href: '/shop?sort=new' },
    { label: 'Best Sellers', href: '/shop?sort=popular' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Support', href: '/support' },
  ],
  learn: [
    { label: 'Projects', href: '/projects' },
    { label: 'Tutorials', href: '/learn/tutorials' },
    { label: 'Guides', href: '/learn/guides' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
} as const;
