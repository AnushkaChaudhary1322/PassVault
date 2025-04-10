// passwordUtils.js

export const generatePassword = ({
    length = 12,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
}) => {
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

let characterPool = '';
if (includeUppercase) characterPool += uppercaseChars;
if (includeLowercase) characterPool += lowercaseChars;
if (includeNumbers) characterPool += numberChars;
if (includeSymbols) characterPool += symbolChars;

if (!characterPool) return '';

let password = '';
for (let i = 0; i < length; i++) {
    const char = characterPool[Math.floor(Math.random() * characterPool.length)];
    password += char;
}

return password;
};

export const calculatePasswordStrength = (password) => {
let strength = 0;

const lengthScore = password.length >= 12 ? 2 : password.length >= 8 ? 1 : 0;
const hasUppercase = /[A-Z]/.test(password) ? 1 : 0;
const hasLowercase = /[a-z]/.test(password) ? 1 : 0;
const hasNumber = /\d/.test(password) ? 1 : 0;
const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0;

strength = lengthScore + hasUppercase + hasLowercase + hasNumber + hasSymbol;

if (strength <= 2) return 'Weak';
if (strength === 3 || strength === 4) return 'Moderate';
return 'Strong';
};
