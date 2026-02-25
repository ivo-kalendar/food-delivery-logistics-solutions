const MainListView = () => {
    const mainLists = [
        {
            id: 1,
            header: 'Lorem, ipsum dolor.',
            paragraph:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio unde veniam pariatur ullam soluta natus? Enim omnis nostrum, officia, quisquam maxime sunt, rem quis at reiciendis debitis adipisci repellendus. Nihil esse tempora maiores magni! Beatae, soluta! Ipsa, in cumque?',
        },
        {
            id: 2,
            header: 'Lorem, ipsum dolor.',
            paragraph:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio unde veniam pariatur ullam soluta natus? Enim omnis nostrum, officia, quisquam maxime sunt, rem quis at reiciendis debitis adipisci repellendus. Nihil esse tempora maiores magni! Beatae, soluta! Ipsa, in cumque?',
        },
        {
            id: 3,
            header: 'Lorem, ipsum dolor.',
            paragraph:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio unde veniam pariatur ullam soluta natus? Enim omnis nostrum, officia, quisquam maxime sunt, rem quis at reiciendis debitis adipisci repellendus. Nihil esse tempora maiores magni! Beatae, soluta! Ipsa, in cumque?',
        },
        {
            id: 4,
            header: 'Lorem, ipsum dolor.',
            paragraph:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio unde veniam pariatur ullam soluta natus? Enim omnis nostrum, officia, quisquam maxime sunt, rem quis at reiciendis debitis adipisci repellendus. Nihil esse tempora maiores magni! Beatae, soluta! Ipsa, in cumque?',
        },
        {
            id: 5,
            header: 'Lorem, ipsum dolor.',
            paragraph:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio unde veniam pariatur ullam soluta natus? Enim omnis nostrum, officia, quisquam maxime sunt, rem quis at reiciendis debitis adipisci repellendus. Nihil esse tempora maiores magni! Beatae, soluta! Ipsa, in cumque?',
        },
    ];

    return (
        <>
            {mainLists.map(({ id, header, paragraph }) => {
                return (
                    <div key={id} className='text-secondary main-list-card'>
                        <h1 className='text-light'>{header}</h1>
                        <p>{paragraph}</p>
                    </div>
                );
            })}
        </>
    );
};

export default MainListView;
