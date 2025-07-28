import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { config } from '@/lib/config';

export interface ContactConfirmationEmailProps {
  name: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const ContactConfirmationEmail = ({
  name,
  subject,
  message,
  timestamp,
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Thank you for reaching out to {config.personal.name}</Preview>
      <Container style={container}>
        <Section style={header}>
          <Row>
            <Column style={headerContent}>
              <Heading style={headerContentTitle}>
                Thank you for reaching out!
              </Heading>
              <Text style={headerContentSubtitle}>
                I've received your message and will get back to you soon
              </Text>
            </Column>
            <Column style={headerImageContainer}>
              <Img
                style={headerImage}
                width={120}
                height={120}
                src={config.email.logoUrl}
                alt={config.personal.name}
              />
            </Column>
          </Row>
        </Section>

        <Section style={content}>
          <Heading as="h2" style={title}>
            Hi {name},
          </Heading>
          
          <Text style={paragraph}>
            Thank you for contacting me through my portfolio. I've received your message and will get back to you within 24 hours.
          </Text>

          <Text style={paragraph}>
            I'm excited to discuss your project and see how we can work together!
          </Text>

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            Your Message
          </Heading>
          
          <Section style={messageContainer}>
            <Row>
              <Column style={messageLabel}>
                <Text style={labelText}>Subject:</Text>
              </Column>
              <Column style={messageValue}>
                <Text style={valueText}>{subject}</Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={messageLabel}>
                <Text style={labelText}>Sent:</Text>
              </Column>
              <Column style={messageValue}>
                <Text style={valueText}>{timestamp}</Text>
              </Column>
            </Row>
            
            <Hr style={messageDivider} />
            
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            What I Can Help With
          </Heading>
          
          <Section style={servicesSection}>
            <Row>
              <Column style={serviceItem}>
                <Text style={serviceTitle}>🚀 Full-Stack Development</Text>
                <Text style={serviceDescription}>
                  Modern web applications with React, Next.js, and TypeScript
                </Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={serviceItem}>
                <Text style={serviceTitle}>🤖 AI-Powered Applications</Text>
                <Text style={serviceDescription}>
                  Intelligent systems and AI integration with modern frameworks
                </Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={serviceItem}>
                <Text style={serviceTitle}>📊 System Architecture</Text>
                <Text style={serviceDescription}>
                  Scalable system design and technical leadership
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={buttonContainer}>
            <Link style={button} href={config.personal.website}>
              View My Portfolio
            </Link>
          </Section>
        </Section>
      </Container>

      <Section style={footer}>
        <Text style={footerText}>
          This is an automated confirmation email. Please don't reply to this message.
        </Text>

        <Hr style={footerDivider} />

        <Row>
          <Column style={footerColumn}>
            <Text style={footerTitle}>{config.personal.name}</Text>
            <Text style={footerSubtitle}>{config.personal.title}</Text>
            <Text style={footerContact}>{config.personal.email}</Text>
          </Column>
          <Column style={footerColumn}>
            <Link href={config.personal.website} style={footerLink}>
              Portfolio
            </Link>
            {config.social.github && !config.social.github.includes('yourusername') && (
              <Link href={config.social.github} style={footerLink}>
                GitHub
              </Link>
            )}
            {config.social.linkedin && !config.social.linkedin.includes('yourusername') && (
              <Link href={config.social.linkedin} style={footerLink}>
                LinkedIn
              </Link>
            )}
          </Column>
        </Row>
      </Section>
    </Body>
  </Html>
);

export default ContactConfirmationEmail;

const main = {
  backgroundColor: '#0f0f23',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  width: '680px',
  maxWidth: '100%',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const header = {
  backgroundColor: '#6366f1',
  padding: '40px 30px',
};

const headerContent = {
  padding: '0',
};

const headerContentTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0 0 8px 0',
};

const headerContentSubtitle = {
  color: '#e0e7ff',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const headerImageContainer = {
  textAlign: 'center' as const,
  padding: '0',
};

const headerImage = {
  borderRadius: '50%',
  border: '3px solid #ffffff',
};

const content = {
  padding: '40px 30px',
};

const title = {
  margin: '0 0 20px',
  fontWeight: '600',
  fontSize: '20px',
  lineHeight: '24px',
  color: '#1f2937',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0 0 16px 0',
};

const divider = {
  margin: '32px 0',
  borderColor: '#e5e7eb',
};

const messageContainer = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const messageLabel = {
  width: '80px',
  paddingRight: '16px',
};

const messageValue = {
  flex: 1,
};

const labelText = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#6b7280',
  margin: '0',
};

const valueText = {
  fontSize: '14px',
  color: '#1f2937',
  margin: '0',
};

const messageDivider = {
  margin: '16px 0',
  borderColor: '#e5e7eb',
};

const messageText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const servicesSection = {
  marginBottom: '32px',
};

const serviceItem = {
  padding: '16px 0',
};

const serviceTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 8px 0',
};

const serviceDescription = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6b7280',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const button = {
  backgroundColor: '#6366f1',
  border: 'none',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  padding: '12px 24px',
  borderRadius: '6px',
  color: '#ffffff',
  textDecoration: 'none',
  display: 'inline-block',
};

const footer = {
  width: '680px',
  maxWidth: '100%',
  margin: '32px auto 0 auto',
  padding: '0 30px',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6b7280',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const footerDivider = {
  margin: '24px 0',
  borderColor: '#e5e7eb',
};

const footerColumn = {
  width: '50%',
};

const footerTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 4px 0',
};

const footerSubtitle = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 8px 0',
};

const footerContact = {
  fontSize: '14px',
  color: '#6366f1',
  margin: '0 0 16px 0',
};

const footerLink = {
  display: 'block',
  color: '#6366f1',
  textDecoration: 'none',
  fontSize: '14px',
  marginBottom: '8px',
}; 