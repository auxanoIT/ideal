# Ideal Solutions consultation delivery

## Setup status

The form `Ideal Solutions — Book Consultation` has been created in HubSpot
account `148498868`. Its ID is `1f691f5a-7ade-4a3a-b32c-87b531f0423d`.
The form and its email workflow must be published and verified before this
change is deployed. The workflow is currently unfinished and OFF.

The consultation endpoint uses this dedicated form. Other enquiry endpoints
retain their own configuration. All seven booking fields map to HubSpot:
`firstname`, `company`, `email`, `phone`, `service_interest`, `message`,
and `lead_source`. The submitted full name is retained in `firstname`.

Optional server environment overrides:

```dotenv
IDEALSOLUTIONS_HUBSPOT_PORTAL_ID=148498868
IDEALSOLUTIONS_HUBSPOT_CONSULTATION_FORM_ID=1f691f5a-7ade-4a3a-b32c-87b531f0423d
```

Set `IDEALSOLUTIONS_HUBSPOT_SUBSCRIPTION_TYPE_ID` only to the actual subscription
type selected for the HubSpot follow-up email; an ID is never guessed.
The existing explicit form consent is required. Invalid or absent subscription
IDs send processing consent without subscribing the contact to an arbitrary list.

## Notifications and customer email

The new form's submission-notification recipient is configured as
`obafemielijahsunday@gmail.com`. Verify that user's global form email
notifications are enabled before the live delivery test.

Complete the form's simple workflow: on submission, email the enrolled contact.
Choose the approved sender, correct subscription type, and accurate company
footer. Enable the workflow only after the email is complete. Do not reuse an
Auxano-branded footer without checking that it is appropriate for Ideal Solutions.

Subject: We've received your consultation request — Ideal Solutions

Hello,

Thank you for contacting Ideal Solutions. We've received your consultation
request and the details you shared.

Our team will review your requirements and get back to you to discuss the next
steps and arrange a suitable consultation time. Your appointment will be
confirmed once we agree on a date and time.

We appreciate the opportunity to support your infrastructure needs.

Kind regards,
The Ideal Solutions Team

## Failure handling and verification

HubSpot failures, including network errors and timeouts, use the existing
Resend fallback. Configure `RESEND_API_KEY`, `IDEALSOLUTIONS_RESEND_FROM_EMAIL`
(verified sender), and `IDEALSOLUTIONS_LEAD_FALLBACK_EMAIL` securely in hosting.
The fallback sends the owner the enquiry as plain text; it does not trigger
HubSpot's customer-email workflow. If neither destination accepts delivery,
the API returns an error instead of reporting success.

Run the mocked provider checks with Node 22.18+:
`node --test scripts/consultation-integration.test.mjs`.
After publication and deployment, submit an explicitly labelled test enquiry
using an approved inbox, check all seven fields in HubSpot, and verify receipt
of both the owner notification and the customer acknowledgement.
