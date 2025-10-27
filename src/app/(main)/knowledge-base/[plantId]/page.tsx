
import PlantDetailClient from '@/components/plant-detail-client';
import { getPlantById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PlantDetailPage({ params }: { params: { plantId: string } }) {
  const plantId = params.plantId ? parseInt(params.plantId, 10) : NaN;
  
  if (isNaN(plantId)) {
    notFound();
  }

  const plant = getPlantById(plantId);

  if (!plant) {
    notFound();
  }

  return <PlantDetailClient plant={plant} />;
}
