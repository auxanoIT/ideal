# Ideal Solutions consultation delivery

## Setup status

The form `Ideal Solutions — Book Consultation` has been created in HubSpot
account `148498868`. Its ID is `1f691f5a-7ade-4a3a-b32c-87b531f0423d`.
The form was published on 2026-09-26. The customer acknowledgement email
(ID `478917158133`) has been saved and attached to the simple workflow.
The workflow remains OFF pending sender verification and a delivery test.
The approved sender is `info@idealsolutions.com`; HubSpot's verification email
was requested on 2026-09-26. The address must be approved from that mailbox,
selected in the acknowledgement email, and checked before enabling the workflow.

Per the user's request, the shared Primary footer was updated to `I & A Solutions`
with both addresses: 26A Adeshina Street, Off Oluwole Phillips, Obafemi Awolowo Way;
and 21, Abeokuta Street, Off Obasa Street, Oba Akran Avenue; Ikeja, Lagos, Nigeria.
The existing unsubscribe and preferences links were retained. This footer is
shared by existing Auxano emails too. Do not deploy until delivery is verified.

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

The form's simple workflow emails the enrolled contact on submission.
The inactive email still has the user's Gmail address as a temporary sender;
replace it with `info@idealsolutions.com` after verification. The available
subscription type is Marketing Information; verify delivery eligibility and
the actual subscription ID without inventing consent. Enable the workflow
only after the email is complete.

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

