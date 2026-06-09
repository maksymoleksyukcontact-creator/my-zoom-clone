import CallsList from "@/components/CallsList"

function Previous() {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='text-3xl font-bold'>Previous</h1>
      <CallsList type="ended" />

    </section>
  )
}

export default Previous