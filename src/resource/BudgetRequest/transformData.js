const transform = (data) => ({...data, deadline: !data.deadline ? null : data.deadline});

export default transform;
