const Card = ({ userArr }) => {
    return (
        <>
            {userArr.map((el, i) => (
                <div
                    style={{
                        wordBreak: 'break-all',
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        padding: '.2rem',
                        overflow: 'hidden',
                    }}
                    key={i}>
                    <span className='text-secondary'>{el.key}: </span>
                    {el.value}
                    <div
                        style={{
                            width: `${
                                el.value.props?.children
                                    ? el.value.props.children.length * 6 + 110
                                    : 110
                            }%`,
                            borderBottom: '1px solid rgba(51, 156, 255, .3)',
                        }}></div>
                </div>
            ))}
        </>
    );
};

export default Card;
