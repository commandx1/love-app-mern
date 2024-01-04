const initialFields = {
    fullName: {
        helperText: 'Lütfen adınızı ve soyadınızı giriniz.',
        isValid: true,
        value: '',
        rule: 'required',
    },
    username: {
        helperText: 'Lütfen kullanıcı adınızı giriniz.',
        isValid: true,
        value: '',
        rule: 'required',
    },
    password: {
        helperText: 'Şifre en az altı haneli olmalıdır.',
        isValid: true,
        value: '',
        rule: 'length',
        min: 6,
    },
};

export default initialFields;
