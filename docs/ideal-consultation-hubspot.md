# Ideal Solutions consultation delivery

## Setup status

The form `Ideal Solutions — Book Consultation` has been created in HubSpot
account `148498868`. Its ID is `1f691f5a-7ade-4a3a-b32c-87b531f0423d`.
The form and its customer acknowledgement email (ID `478917158133`) are published.
The simple workflow is ON. The user approved the temporary sender
`Ideal Solutions <obafemielijahsunday@gmail.com>`. Switch to
`info@idealsolutions.com` only after that mailbox becomes available and HubSpot
sender verification is completed; no code change is required for the sender.

On 2026-09-27, the real integration module submitted labelled test bookings.
HubSpot recorded the submissions and the contact timeline confirmed that both
acknowledgement emails were Delivered. Earlier tests exposed and resolved two
configuration issues: missing subscription consent and an unregistered test
site domain. `idealsolutions.com.ng` is now saved as an additional site domain.
Register any actual alternative production/preview domain in HubSpot before
using it for bookings: HTTP 200 alone does not prove a submission avoided spam.

Per the user's request, the shared Primary footer was updated to `I & A Solutions`
with both addresses: 26A Adeshina Street, Off Oluwole Phillips, Obafemi Awolowo Way;
and 21, Abeokuta Street, Off Obasa Street, Oba Akran Avenue; Ikeja, Lagos, Nigeria.
The existing unsubscribe and preferences links were retained. This footer is
shared by existing Auxano emails too.

The consultation endpoint uses this dedicated form. Other enquiry endpoints
retain their own configuration. All seven booking fields map to HubSpot:
`firstname`, `company`, `email`, `phone`, `service_interest`, `message`,
and `lead_source`. The submitted full name is retained in `firstname`.

Optional server environment overrides:

```dotenv
IDEALSOLUTIONS_HUBSPOT_PORTAL_ID=148498868
IDEALSOLUTIONS_HUBSPOT_CONSULTATION_FORM_ID=1f691f5a-7ade-4a3a-b32c-87b531f0423d
```

The dedicated consultation destination defaults to verified subscription type
`2710261669` (Marketing Information), selected in the acknowledgement email and
confirmed from the HubSpot form consent control. The website requires explicit
consent to email about the request; the public HubSpot form now records matching
communication and processing consent too. Do not use this consent for unrelated
promotions. Unsubscribe and HubSpot delivery eligibility still apply.

`IDEALSOLUTIONS_HUBSPOT_SUBSCRIPTION_TYPE_ID` can override the subscription.
Only use an actual positive subscription ID from the destination account.
The account-specific default is not applied to other enquiry endpoints or an
overridden consultation destination. Invalid IDs do not create a subscription.

## Notifications and customer email

The new form's submission-notification recipient is configured as
`obafemielijahsunday@gmail.com`. Owner inbox receipt has not been independently inspected.

The form's simple workflow emails the enrolled contact on submission using
the approved Gmail sender. Delivery was verified in the contact activity timeline.

Subject: We've received your consultation request — Ideal Solutions

Hello,

Thank you for contacting Ideal Solutions. We've received your consultation
request and the details you shared.

Our team is reviewing your requirements and will get back to you to discuss the next
steps and arrange a suitable consultation time. Your appointment will be
confirmed once we agree on a date and time.

We appreciate the opportunity to support your IT infrastructure needs.

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
After deployment, submit an explicitly labelled test enquiry
using an approved inbox, check all seven fields in HubSpot, and verify receipt
of both the owner notification and the customer acknowledgement.
