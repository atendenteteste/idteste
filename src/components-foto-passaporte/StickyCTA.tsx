"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { usePageContent } from '../lib/hooks';

interface StickyCTAProps {
  // Allow the ref to potentially be null, as useRef initializes with null
  triggerRef: React.RefObject<HTMLElement | null>;
  hideTriggerRef: React.RefObject<HTMLElement | null>; // Add ref for hiding trigger
}

export default function StickyCTA({ triggerRef, hideTriggerRef }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [triggerTopPosition, setTriggerTopPosition] = useState<number | null>(null);
  const [triggerBottomPosition, setTriggerBottomPosition] = useState<number | null>(null);
  const [hideTriggerPosition, setHideTriggerPosition] = useState<number | null>(null); // State for hide trigger position
  const [isMobile, setIsMobile] = useState(false);

  // Get the current locale from the URL
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  
  // Get customized content based on the current locale
  const { content } = usePageContent(locale);
  
  // Get StickyCTA content with fallback to default values
  const stickyCTAContent = content.StickyCTA || {
    buttonText: 'Escolha o documento',
    buttonLink: '/upload',
    gradientStartColor: '#6A0FDA',
    gradientEndColor: '#B45DEB',
    topLineColor: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
    backgroundColor: '#F1F6FA'
  };

  // Effect to detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Check initially
    window.addEventListener('resize', checkMobile); // Update on resize
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Effect to calculate the trigger position once the ref is available
  useEffect(() => {
    // Debounce or throttle this if performance becomes an issue on resize
    const calculatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        // We track both top and bottom positions of the hero image
        const topPosition = rect.top + window.scrollY;
        const bottomPosition = rect.bottom + window.scrollY;
        setTriggerTopPosition(topPosition);
        setTriggerBottomPosition(bottomPosition);
      }
    };

    calculatePosition(); // Calculate initially
    window.addEventListener('resize', calculatePosition); // Recalculate on resize
    window.addEventListener('scroll', calculatePosition); // Also recalculate on scroll for more precision

    return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
    };
  }, [triggerRef]); // Recalculate if the ref changes or on mount

  // Effect to calculate the hide trigger position
  useEffect(() => {
    const calculateHidePosition = () => {
      if (hideTriggerRef.current) {
        const rect = hideTriggerRef.current.getBoundingClientRect();
        // Hide when the top of the hide trigger element goes above the top of the viewport
        const topPosition = rect.top + window.scrollY;
        setHideTriggerPosition(topPosition);
      }
    };

    calculateHidePosition(); // Calculate initially
    window.addEventListener('resize', calculateHidePosition); // Recalculate on resize

    return () => {
      window.removeEventListener('resize', calculateHidePosition);
    };
  }, [hideTriggerRef]); // Recalculate if the hide ref changes or on mount


  // Effect to handle scroll event
  useEffect(() => {
    // Throttle this function for performance if needed
    const handleScroll = () => {
      // Different logic for mobile vs desktop
      let heroImageOutOfView;
      
      if (isMobile) {
        // MOBILE VIEW: Mostrar após rolar 700px
        heroImageOutOfView = window.scrollY > 700;
      } else {
        // DESKTOP VIEW: Mostrar após rolar 600px
        heroImageOutOfView = window.scrollY > 750;
      }
      
      // Check if the user has scrolled past the hide trigger position
      const hide = hideTriggerPosition !== null && window.scrollY > hideTriggerPosition;

      // Set visibility: show only if hero image is out of view and we haven't reached the hide trigger
      setIsVisible(heroImageOutOfView && !hide);
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener
    // Call handler once initially in case the element is already past the trigger point on load
    handleScroll();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // Rerun effect if any trigger position changes
  }, [triggerTopPosition, triggerBottomPosition, hideTriggerPosition, isMobile, triggerRef]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-[${stickyCTAContent.backgroundColor}] shadow-lg transition-transform duration-300 ease-in-out transform z-50 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!isVisible}
    >
      {/* Add the purple gradient line at the top */}
      <div 
        className="w-full h-1"
        style={{ background: stickyCTAContent.topLineColor }}
      ></div>
      
      {/* Existing content with padding */}
      <div className="max-w-7xl mx-auto flex justify-center items-center p-4">
        <button 
          className="inline-block px-8 py-4 rounded-full text-white font-bold hover:opacity-90 transition-opacity text-[13px] tracking-tight"
          style={{ background: `linear-gradient(to right, ${stickyCTAContent.gradientStartColor}, ${stickyCTAContent.gradientEndColor})` }}
        >
          {stickyCTAContent.buttonText}
        </button>
      </div>
    </div>
  );
} 