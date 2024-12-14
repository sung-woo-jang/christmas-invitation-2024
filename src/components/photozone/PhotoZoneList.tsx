'use client';
import Image from 'next/image';
import { Photo } from '@/utils/object-storage';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PhotoZonePreviewProps {
  photos: Photo[];
  limit?: number;
}

export default function PhotoZoneList({
  photos,
  limit,
}: PhotoZonePreviewProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);

  const handleDeleteClick = (photo: Photo) => {
    setPhotoToDelete(photo);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!photoToDelete) return;

    try {
      // URL에서 파일명만 추출 (마지막 '/' 이후의 문자열)
      const fileName = photoToDelete.name.split('/').pop();
      if (!fileName) return;

      const response = await fetch(
        `/api/photos?fileName=${encodeURIComponent(fileName)}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      // 성공적으로 삭제되면 UI에서도 제거
      setIsDeleteModalOpen(false);
      setPhotoToDelete(null);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting photo:', error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <>
      <div className='grid gap-4 sm:gap-6'>
        {photos?.slice(0, limit).map((photo) => (
          <div
            key={photo.id}
            className='bg-white p-2 sm:p-4 rounded-lg shadow-lg relative'
          >
            <div className='aspect-[3/4] relative'>
              <Image
                src={photo?.base64Url ? photo?.base64Url : '/Christmas.webp'}
                alt={`포토존 ${photo.id}`}
                fill
                className='rounded-lg object-cover'
                sizes='(max-width: 430px) 90vw, (max-width: 768px) 45vw, 30vw'
              />
              <button
                onClick={() => handleDeleteClick(photo)}
                className='absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity'
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사진 삭제 확인</DialogTitle>
            <DialogDescription>
              정말로 이 사진을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              취소
            </Button>
            <Button variant='destructive' onClick={handleDeleteConfirm}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
