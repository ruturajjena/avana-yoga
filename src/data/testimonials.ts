/**
 * Testimonials exactly as published on avanayoga.com.
 * Quotes are verbatim (student voice preserved, including original spelling).
 * `highlight` is a verbatim sentence lifted from the same quote for editorial display.
 */

export type Testimonial = {
  id: string;
  name: string;
  title?: string;
  quote: string;
  highlight: string;
};

export const homeTestimonials: Testimonial[] = [
  {
    id: 'naomi',
    name: 'Naomi',
    highlight: 'He has magic as a teacher and although he is young he seems wise beyond his time.',
    quote:
      "The first thought that struck me upon meeting Yogi Madhav is that he is an extremely special young man. There's a certain glimmer in his eyes that seems like it's only the shining surface of an ocean of knowledge and a soul beyond his years! He is truly incredible at Yoga and asanas and he is so inspiring in the way he teaches. He is the reason I can do a headstand which is something I never thought I would do. He has magic as a teacher and although he is young he seems wise beyond his time. I think every yoga student and teacher needs to make it a priority to learn from him.",
  },
  {
    id: 'clara',
    name: 'Clara',
    highlight: 'His approach is direct, thorough, encouraging and kind.',
    quote:
      "I completed my teacher training at Yoga Ashram in India and am so thankful for Yogi Madhav's genuine caring and compassion for his students. Not only is he incredibly committed to his own practice, but also to his students. His approach is direct, thorough, encouraging and kind. He has the ability to read his students and push when it's needed. He has a great sense of humour and brings that to the class making for a difficult asana class seem not so difficult in the sweater heat of India in July. Thank you Madhav for an amazing experience you will always be my teacher.",
  },
  {
    id: 'flavia',
    name: 'Flavia',
    highlight: 'He was an amazing teacher, you can feel that Yoga is his passion.',
    quote:
      'I did the TTC in Cambodia and had the pleasure to have Madhav as my yoga teacher during this time. He was an amazing teacher, you can feel that Yoga is his passion. His Knowlege about the yoga philosophy and body is very big. He teached us all the important things about yoga in this short time. I felt very comfortable and save in this time and just enjoyed to learn about Yoga from him. It was one of the best times and I would recommend to everyone to go to a Yoga lession or TTC of Yogi Madhav. Thank you so much for sharing your Knowlege and passion with us!',
  },
  {
    id: 'miyuki',
    name: 'Miyuki',
    highlight: 'Yogi Madhav’s teaching and instructions are clear and sharp, always purely essential.',
    quote:
      'I am very honored to have a opportunity of being a student of Yogi Madhav in RYT200 training. He is full of knowledge, intelligent , academic, very physically trained, caring, compassionate and very supportive to all students. Yogi Madhav’s teaching and instructions are clear and sharp, always purely essential. His guiding is very profound and effective in body, mind and spirit. Yogi Madhav has highest quality for all elements as Yoga teacher. I strongly recommend him to anybody who is looking for genuine quality and life changing Yoga experience.',
  },
];

export const trainingTestimonials: Testimonial[] = [
  {
    id: 'nikki',
    name: 'Nikki',
    title: 'A very caring teacher',
    highlight: 'He has a wealth of experience practicing yoga in its classical form.',
    quote:
      'Madhav is a very thoughtful and knowledgable teacher and gentle human being. He has a wealth of experience practicing yoga in its classical form. He tends to teach from a traditional perspective but maintains an openess to modern yoga practices. It was a pleasure being his student.',
  },
  {
    id: 'ilona',
    name: 'Ilona',
    title: 'Best experience ever.',
    highlight: 'The best teachers are the ones that make you feel the love and passion for yoga....Madhav did!',
    quote:
      'I was lucky enough to be a student of Madhav for 4 weeks. Never in my mind I thought I was capable of such beautiful and intense yoga experiences. In every way he guided me and my group trough the 4 week period of yoga training. Every class, whether it was meditation or asana, I felt the spiritual and professional capacity of Madhav. The best teachers are the ones that make you feel the love and passion for yoga....Madhav did!',
  },
  {
    id: 'natasha',
    name: 'Natasha',
    title: 'A wonderful teacher and person.',
    highlight: 'Yogi Madhav is an exceptionally talented, patient, kind and skilful teacher.',
    quote:
      'Yogi Madhav is an exceptionally talented, patient, kind and skilful teacher. He has the correct balance between instruction and support as well as body focus and spiritual guidance and advice. I would not hesitate in any way to recommend him to anyone. Those who are fortunate to take his classes or train under his guidance are truly blessed and I have no doubt will be delighted with his abilities.',
  },
  {
    id: 'chynthia',
    name: 'Chynthia',
    title: 'Great teacher and wonderful experience !',
    highlight: 'You will find in his teaching all the qualities you need in a teacher.',
    quote:
      "Great teacher, person and amazing yogi! Very pedagogue, caring, patiente and observant. You will find in his teaching all the qualities you need in a teacher. I'm very grateful to had the opportunity to be his student and I wish you to be as lucky as I was. Namaste.",
  },
  {
    id: 'claudia',
    name: 'Claudia',
    title: 'A person who inspires.',
    highlight: 'Yogi Madhav inspires yoga in everything he does',
    quote:
      'Yogi Madhav inspires yoga in everything he does , hes totally devote to it and hes always happy to share hes knowledge with everyone , im really happy our paths came across .',
  },
];
