import Feature from "./Feautre";
const features = [
    {
        title: 'Effortless Setup',
        description: 'Quickly get started with simple integration into your website.',
    },
    {
        title: 'Fully Customizable',
        description: 'Tailor the widget and dashboard to match your brand and goals.',
        icon: 'icon-2',
    },
    {
        title: 'Actionable Insights',
        description: 'Turn user feedback into data-driven decisions with detailed analytics.',
    },
    {
        title: 'Top-Notch Security',
        description: 'Rest easy knowing your feedback and data are protected with advanced security measures.',
    },
    {
        title: 'Grow as You Go',
        description: 'Scale your projects effortlessly as your business and feedback needs expand.',
    },
    {
        title: 'Reliable Support',
        description: 'Our dedicated support team is here to assist you whenever you need help.',
    }
];


const Features = () => {
    return (
        <section className="container mx-auto max-w-screen-xl px-4 my-24 flex items-center flex-col">
            <h2 className="mb-6 text-2xl font-bold">Features</h2>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                        <Feature key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;