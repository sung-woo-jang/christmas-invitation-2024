'use client';
import Image from 'next/image';
import { Photo } from '@/utils/object-storage';
import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (photo: Photo) => {
    setPhotoToDelete(photo);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!photoToDelete) return;

    try {
      setIsDeleting(true);
      setError(null);
      const fileName = photoToDelete.name.split('/').pop();
      if (!fileName) return;

      const response = await fetch(
        `/api/photos?fileName=${encodeURIComponent(fileName)}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        return;
      }

      setIsDeleteModalOpen(false);
      setPhotoToDelete(null);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting photo:', error);
      setError('사진 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className='grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {photos?.slice(0, limit).map((photo) => (
          <Card key={photo.id} className='overflow-hidden'>
            <CardContent className='p-0'>
              <div className='aspect-[3/4] relative'>
                <Image
                  src={photo?.base64Url ? photo?.base64Url : '/123.jpeg'}
                  alt={`포토존 ${photo.id}`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 430px) 90vw, (max-width: 768px) 45vw, 30vw'
                />
                <button
                  onClick={() => handleDeleteClick(photo)}
                  className='absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity'
                >
                  <X size={20} />
                </button>
              </div>
            </CardContent>
          </Card>
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
          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  삭제 중...
                </>
              ) : (
                '삭제'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
