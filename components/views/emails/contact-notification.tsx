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

export interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const ContactNotificationEmail = ({
  name,
  email,
  subject,
  message,
  timestamp,
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New contact message from {name}</Preview>
      <Container style={container}>
        <Section style={header}>
          <Row>
            <Column style={headerContent}>
              <Heading style={headerContentTitle}>
                New Contact Message
              </Heading>
              <Text style={headerContentSubtitle}>
                Someone reached out through your portfolio
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
            Contact Details
          </Heading>
          
          <Section style={infoSection}>
            <Row>
              <Column style={infoLabel}>
                <Text style={labelText}>From:</Text>
              </Column>
              <Column style={infoValue}>
                <Text style={valueText}>{name} ({email})</Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={infoLabel}>
                <Text style={labelText}>Subject:</Text>
              </Column>
              <Column style={infoValue}>
                <Text style={valueText}>{subject}</Text>
              </Column>
            </Row>
            
            <Row>
              <Column style={infoLabel}>
                <Text style={labelText}>Time:</Text>
              </Column>
              <Column style={infoValue}>
                <Text style={valueText}>{timestamp}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            Message
          </Heading>
          <Section style={messageContainer}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          <Section style={buttonContainer}>
            <Link style={button} href={`mailto:${email}?subject=Re: ${subject}`}>
              Reply to {name}
            </Link>
          </Section>
        </Section>
      </Container>

      <Section style={footer}>
        <Text style={footerText}>
          This message was sent from your portfolio contact form at {timestamp}.
        </Text>

        <Hr style={footerDivider} />

        <Row>
          <Column style={footerColumn}>
            <Text style={footerTitle}>{config.personal.name}</Text>
            <Text style={footerSubtitle}>{config.personal.title}</Text>
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

export default ContactNotificationEmail;

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

const infoSection = {
  marginBottom: '24px',
};

const infoLabel = {
  width: '80px',
  paddingRight: '16px',
};

const infoValue = {
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

const divider = {
  margin: '32px 0',
  borderColor: '#e5e7eb',
};

const messageContainer = {
  backgroundColor: '#f9fafb',
  padding: '20px',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const messageText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
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
  margin: '0 0 16px 0',
};

const footerLink = {
  display: 'block',
  color: '#6366f1',
  textDecoration: 'none',
  fontSize: '14px',
  marginBottom: '8px',
}; 