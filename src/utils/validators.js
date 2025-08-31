export function validateEmail(email){
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}
export function validatePassword(password){
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const okLen = password.length >= 8
  let error = ''
  if(!okLen) error += '- 8 أحرف على الأقل\n'
  if(!hasUppercase) error += '- حرف كبير واحد على الأقل (A-Z)\n'
  if(!hasLowercase) error += '- حرف صغير واحد على الأقل (a-z)\n'
  if(!hasNumber) error += '- رقم واحد على الأقل (0-9)'
  return { isValid: hasUppercase && hasLowercase && hasNumber && okLen, error }
}
