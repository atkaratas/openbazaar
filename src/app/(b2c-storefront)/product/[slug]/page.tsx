export default async function ProductDetailPage({ params }: any) {
  // Let's just dump the params to screen to see if it even boots
  const resolvedParams = await params;
  
  return (
    <div className="p-20 text-center text-xl font-bold">
      Test Sayfası. Slug: {resolvedParams?.slug || 'Bilinmiyor'}
    </div>
  )
}
