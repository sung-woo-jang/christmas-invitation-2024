import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(password);
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>메시지 삭제 확인</DialogTitle>
          <DialogDescription>
            메시지를 삭제하려면 비밀번호를 입력하세요. 이 작업은 취소할 수
            없습니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='password'>비밀번호</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className='sm:justify-center'>
            <div className='flex flex-col sm:flex-row justify-center gap-4 w-full'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                className='sm:w-28'
              >
                취소
              </Button>
              <Button type='submit' variant='destructive' className='sm:w-28'>
                삭제
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
