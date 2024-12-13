export const validateMessage = (formData: {
  name: string;
  content: string;
  password: string;
}) => {
  const errors: Record<string, string> = {};

  if (!formData.content.trim()) {
    errors.content = '메시지를 입력해주세요.';
  } else if (formData.content.length > 500) {
    errors.content = '메시지는 500자를 초과할 수 없습니다.';
  }

  if (!formData.name.trim()) {
    errors.name = '이름을 입력해주세요.';
  } else if (formData.name.length > 20) {
    errors.name = '이름은 20자를 초과할 수 없습니다.';
  }

  if (!formData.password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (formData.password.length < 4) {
    errors.password = '비밀번호는 최소 4자 이상이어야 합니다.';
  } else if (formData.password.length > 20) {
    errors.password = '비밀번호는 20자를 초과할 수 없습니다.';
  }

  return errors;
};
