export interface Email {
    subject?: string,
    body?: string,
    signature?: string
}

export interface Contact {
    name?: string,
    email?: string,
    ccEmail?: string
}

export interface EmailPayload {
    recipients?: Array<Contact>,
    emailContent: Email
}

export class AppState {
    selectedContacts?: Array<Contact>;
    emailContent?: Email
}

