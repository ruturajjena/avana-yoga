/** Legal pages — verbatim from avanayoga.com/privacy-policy/ and /terms-and-conditions/. */

export type LegalSection = { id: string; heading: string; paragraphs?: string[]; listIntro?: string; list?: string[] };

export type LegalDocument = {
  eyebrow: string;
  title: string;
  intro: string[];
  sections: LegalSection[];
  seo: { title: string; description: string };
};

export const privacyPolicy: LegalDocument = {
  eyebrow: 'Avana Yoga',
  title: 'Privacy Policy',
  intro: [
    'The privacy policy explains how Avana Yoga uses the information we get from you when you use the Avana Yoga website. Avana Yoga tries to protect your privacy as much as possible. The information we ask for from you will be used in accordance with the privacy policy. Avana Yoga can always modify or update this policy. In that case, this page will also be updated.',
  ],
  sections: [
    {
      id: 'which-data',
      heading: 'Which data can we collect?',
      list: ['Name', 'The contact information like email, phone number, etc.', 'Demographic information', 'All data relevant to your yoga past'],
    },
    {
      id: 'why-we-collect',
      heading: 'Why do we collect this data?',
      list: ['To improve our facilities, training and/or website', 'To be able to contact you', 'We can use these data to update our website', 'We never sell user information'],
    },
    { id: 'safety', heading: 'Safety', paragraphs: ['We try to make sure that your data is safe from unauthorised access or publication.'] },
    {
      id: 'links',
      heading: 'Links to other websites',
      paragraphs: [
        'Our website may contain external links but we can not guarantee the quality of these websites and we can not be held responsible for the protection and privacy of data when you visit these websites.',
      ],
    },
  ],
  seo: {
    title: 'Privacy Policy',
    description: 'How Avana Yoga uses the information we receive from you when you use the Avana Yoga website: which data we collect, why, and how we keep it safe.',
  },
};

export const termsAndConditions: LegalDocument = {
  eyebrow: 'Avana Yoga',
  title: 'Terms & Conditions',
  intro: [
    'Welcome to our website www.avanayoga.com. By continuing to surf on our website you agree with the general terms and conditions which, together with our privacy policy, determine the relationship between you and Avana Yoga regarding this website. The terms ‘Avana Yoga’, ‘us’ or ‘we’ refer to the owners of the website. The term ‘you’ refers to the user or browser of our website.',
  ],
  sections: [
    {
      id: 'website-use',
      heading: 'Use of this website',
      listIntro: 'The use of this website is subject to the following Terms and Conditions:',
      list: [
        'The content of the pages only serves to offer general information. This information can be changed without notice.',
        'We or any other third party offers any guarantee regarding the specificity, truthfulness or seemliness of the information and content published on this website for a certain purpose. You understand that the information and content can contain inaccuracies or mistakes and we can not be held responsible for these inaccuracies or mistakes as long as they are permitted by law.',
        'The use of information on this website is at your own risk and responsibility.',
        'The content published at this website belongs to us or is licensed with us.',
        'Unauthorised use of the content of this website can lead to insurance claims and/or can be considered a crime.',
        'The website may contain external links to other websites. These links are only provided for general information. They do not imply that we recommend these websites. We can not be held liable for the content of external links.',
        'You are not allowed to add a link to this website without the written approval of Avana Yoga.',
      ],
    },
    { id: 'refund-policy', heading: 'Refund Policy', paragraphs: ['We have a strict no refund policy. We, therefore, suggest students buy suitable insurance to cover any risks.'] },
    { id: 'fees', heading: 'Terms & Conditions', paragraphs: ['All the paid fees are not refundable in any situation.'] },
    {
      id: 'credit-note',
      heading: 'Credit Note',
      paragraphs: [
        'If a student withdraws from the course due to serious medical condition or injury, a Credit Note for the remaining unused value may be given if sufficient proof is provided to prove that the student can not follow the course any more. The credit note can be used towards any future courses at Avana Yoga. All credit notes have a validity of two years from the date of issue.',
      ],
    },
    {
      id: 'transfer-future-date',
      heading: 'Transfer of Registration to a future date',
      paragraphs: [
        'A student can transfer his / her registration from one course to another no later than 4 weeks before the start of the original course (once only). After this time fees are forfeited. The student can shift the paid fees towards any future date within 2 years of the original registration date. If the student requests the cancellation/shift of registration less than 4 weeks prior to the course registered, there will be an administration and cancellation charge of GBP 200 applicable to all the transfers.',
      ],
    },
    { id: 'transfer-third-person', heading: 'Transfer of Registration to a third Person', paragraphs: ['Transfer of registration to a third person is not allowed in any case.'] },
  ],
  seo: {
    title: 'Terms & Conditions',
    description: 'Avana Yoga website terms, refund policy, credit notes and transfer of registration for courses and retreats.',
  },
};
