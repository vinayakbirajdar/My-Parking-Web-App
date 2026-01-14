import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header Section', () => {
    it('should display the main title "Help & Support"', () => {
      const title = debugElement.query(By.css('h5.fw-bold'));
      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent.trim()).toBe('Help & Support');
    });

    it('should display the subtitle', () => {
      const subtitle = debugElement.query(By.css('small.text-muted'));
      expect(subtitle).toBeTruthy();
      expect(subtitle.nativeElement.textContent.trim()).toBe('Get assistance and find answers');
    });

    it('should display the welcome text badge', () => {
      const welcomeText = debugElement.query(By.css('.welcome-text'));
      expect(welcomeText).toBeTruthy();
      expect(welcomeText.nativeElement.textContent).toContain('Support Center');
    });
  });

  describe('Quick Help Section', () => {
    it('should display "Quick Help" section title', () => {
      const sectionTitle = debugElement.queryAll(By.css('p.fw-semibold'))[0];
      expect(sectionTitle).toBeTruthy();
      expect(sectionTitle.nativeElement.textContent.trim()).toBe('Quick Help');
    });

    it('should display three quick help cards', () => {
      const helpCards = debugElement.queryAll(By.css('.help-card'));
      expect(helpCards.length).toBe(3);
    });

    it('should display "How to Book Parking" card', () => {
      const cards = debugElement.queryAll(By.css('.help-card'));
      const bookingCard = cards[0];
      expect(bookingCard.nativeElement.textContent).toContain('How to Book Parking');
      expect(bookingCard.nativeElement.textContent).toContain('Learn how to book a parking spot');
    });

    it('should display "Payment Issues" card', () => {
      const cards = debugElement.queryAll(By.css('.help-card'));
      const paymentCard = cards[1];
      expect(paymentCard.nativeElement.textContent).toContain('Payment Issues');
      expect(paymentCard.nativeElement.textContent).toContain('Troubleshoot payment problems');
    });

    it('should display "Vehicle Management" card', () => {
      const cards = debugElement.queryAll(By.css('.help-card'));
      const vehicleCard = cards[2];
      expect(vehicleCard.nativeElement.textContent).toContain('Vehicle Management');
      expect(vehicleCard.nativeElement.textContent).toContain('Add or manage your vehicles');
    });

    it('should have help icons in each card', () => {
      const helpIcons = debugElement.queryAll(By.css('.help-icon'));
      expect(helpIcons.length).toBe(3);
    });
  });

  describe('FAQ Section', () => {
    it('should display "Frequently Asked Questions" section title', () => {
      const sectionTitles = debugElement.queryAll(By.css('p.fw-semibold'));
      const faqTitle = sectionTitles.find(title => 
        title.nativeElement.textContent.trim() === 'Frequently Asked Questions'
      );
      expect(faqTitle).toBeTruthy();
    });

    it('should display all 5 FAQ items', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      expect(faqItems.length).toBe(5);
    });

    it('should display "How do I book a parking spot?" question', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      const firstQuestion = faqItems[0].query(By.css('h6'));
      expect(firstQuestion.nativeElement.textContent.trim()).toBe('How do I book a parking spot?');
    });

    it('should display "What payment methods are accepted?" question', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      const secondQuestion = faqItems[1].query(By.css('h6'));
      expect(secondQuestion.nativeElement.textContent.trim()).toBe('What payment methods are accepted?');
    });

    it('should display "Can I cancel my booking?" question', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      const thirdQuestion = faqItems[2].query(By.css('h6'));
      expect(thirdQuestion.nativeElement.textContent.trim()).toBe('Can I cancel my booking?');
    });

    it('should display "How do I add a new vehicle?" question', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      const fourthQuestion = faqItems[3].query(By.css('h6'));
      expect(fourthQuestion.nativeElement.textContent.trim()).toBe('How do I add a new vehicle?');
    });

    it('should display "What if I can\'t find my parking spot?" question', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      const fifthQuestion = faqItems[4].query(By.css('h6'));
      expect(fifthQuestion.nativeElement.textContent.trim()).toBe('What if I can\'t find my parking spot?');
    });

    it('should have answers for each FAQ item', () => {
      const faqItems = debugElement.queryAll(By.css('.faq-item'));
      faqItems.forEach(item => {
        const answer = item.query(By.css('p.text-muted'));
        expect(answer).toBeTruthy();
        expect(answer.nativeElement.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Contact Support Section', () => {
    it('should display "Contact Support" section title', () => {
      const sectionTitles = debugElement.queryAll(By.css('p.fw-semibold'));
      const contactTitle = sectionTitles.find(title => 
        title.nativeElement.textContent.trim() === 'Contact Support'
      );
      expect(contactTitle).toBeTruthy();
    });

    it('should display two contact cards', () => {
      const contactCards = debugElement.queryAll(By.css('.contact-card'));
      expect(contactCards.length).toBe(2);
    });

    it('should display email support card with correct information', () => {
      const contactCards = debugElement.queryAll(By.css('.contact-card'));
      const emailCard = contactCards[0];
      expect(emailCard.nativeElement.textContent).toContain('Email Support');
      expect(emailCard.nativeElement.textContent).toContain('support@parkingapp.com');
    });

    it('should display phone support card with correct information', () => {
      const contactCards = debugElement.queryAll(By.css('.contact-card'));
      const phoneCard = contactCards[1];
      expect(phoneCard.nativeElement.textContent).toContain('Phone Support');
      expect(phoneCard.nativeElement.textContent).toContain('+91 1800-123-4567');
    });

    it('should have "Send Email" button in email card', () => {
      const buttons = debugElement.queryAll(By.css('button'));
      const sendEmailButton = buttons.find(btn => 
        btn.nativeElement.textContent.trim() === 'Send Email'
      );
      expect(sendEmailButton).toBeTruthy();
    });

    it('should have "Call Now" button in phone card', () => {
      const buttons = debugElement.queryAll(By.css('button'));
      const callNowButton = buttons.find(btn => 
        btn.nativeElement.textContent.trim() === 'Call Now'
      );
      expect(callNowButton).toBeTruthy();
    });

    it('should have contact icons', () => {
      const contactIcons = debugElement.queryAll(By.css('.contact-icon'));
      expect(contactIcons.length).toBe(2);
    });
  });

  describe('Common Issues Section', () => {
    it('should display "Common Issues" section title', () => {
      const sectionTitles = debugElement.queryAll(By.css('p.fw-semibold'));
      const issuesTitle = sectionTitles.find(title => 
        title.nativeElement.textContent.trim() === 'Common Issues'
      );
      expect(issuesTitle).toBeTruthy();
    });

    it('should display three common issue items', () => {
      const issueItems = debugElement.queryAll(By.css('.issue-item'));
      expect(issueItems.length).toBe(3);
    });

    it('should display "App Not Loading" issue', () => {
      const issueItems = debugElement.queryAll(By.css('.issue-item'));
      const firstIssue = issueItems[0];
      expect(firstIssue.nativeElement.textContent).toContain('App Not Loading');
      expect(firstIssue.nativeElement.textContent).toContain('Try clearing your app cache');
    });

    it('should display "Payment Failed" issue', () => {
      const issueItems = debugElement.queryAll(By.css('.issue-item'));
      const secondIssue = issueItems[1];
      expect(secondIssue.nativeElement.textContent).toContain('Payment Failed');
      expect(secondIssue.nativeElement.textContent).toContain('Check your payment method details');
    });

    it('should display "Location Not Detected" issue', () => {
      const issueItems = debugElement.queryAll(By.css('.issue-item'));
      const thirdIssue = issueItems[2];
      expect(thirdIssue.nativeElement.textContent).toContain('Location Not Detected');
      expect(thirdIssue.nativeElement.textContent).toContain('Enable location services');
    });

    it('should have issue badges for each issue', () => {
      const issueBadges = debugElement.queryAll(By.css('.issue-badge'));
      expect(issueBadges.length).toBe(3);
    });

    it('should have descriptions for each issue', () => {
      const issueItems = debugElement.queryAll(By.css('.issue-item'));
      issueItems.forEach(item => {
        const description = item.query(By.css('p.text-muted'));
        expect(description).toBeTruthy();
        expect(description.nativeElement.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Component Structure', () => {
    it('should have a container-fluid as root element', () => {
      const container = debugElement.query(By.css('.container-fluid'));
      expect(container).toBeTruthy();
    });

    it('should have header-box element', () => {
      const headerBox = debugElement.query(By.css('.header-box'));
      expect(headerBox).toBeTruthy();
    });

    it('should render all main sections', () => {
      const quickHelpSection = debugElement.query(By.css('p.fw-semibold'));
      const faqSection = debugElement.queryAll(By.css('.faq-item'));
      const contactSection = debugElement.queryAll(By.css('.contact-card'));
      const issuesSection = debugElement.queryAll(By.css('.issue-item'));

      expect(quickHelpSection).toBeTruthy();
      expect(faqSection.length).toBeGreaterThan(0);
      expect(contactSection.length).toBeGreaterThan(0);
      expect(issuesSection.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility and UI Elements', () => {
    it('should have all cards with shadow-sm class', () => {
      const cards = debugElement.queryAll(By.css('.card.shadow-sm'));
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should have proper Bootstrap grid structure', () => {
      const rows = debugElement.queryAll(By.css('.row'));
      expect(rows.length).toBeGreaterThan(0);
    });

    it('should have responsive column classes', () => {
      const cols = debugElement.queryAll(By.css('[class*="col-"]'));
      expect(cols.length).toBeGreaterThan(0);
    });
  });
});
