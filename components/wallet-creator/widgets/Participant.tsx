"use client"

import IconRenderer from "./IconRenderer"
import { FilterableItem } from "../type"
import { Button } from "@/components/ui"
import { useEffect, useState } from "react"
import { isValidEmailAddress } from "@/utils"

type Role = WalletConstructor["participants"][number]["role"]

type ParticipantProps = FilterableItem & {
  isParticipant: boolean
  onAdd: (role: Role) => void
  onRemove: () => void
}

const Participant = ({
  value,
  image,
  display_name,
  isParticipant,
  onAdd,
  onRemove,
}: ParticipantProps) => {
  const [fetchedImage, setFetchedImage] = useState("")

  /* useEffect(() => {
    const fetchImage = async () => {
      if (image || fetchedImage || !isValidEmailAddress(value)) return
      const [data, error] = await searchUsersByEmail(value)
      if (data?.length) {
        setFetchedImage(data[0].image)
        console.log(`Fetched image data on participant ${value}`)
      } else {
        console.log(`Could not image data on participant ${value}`)
      }
    }
    fetchImage()
  }, [fetchedImage, image, value]) */

  return (
    <>
      <IconRenderer
        image={image ?? fetchedImage}
        size={24}
        fallbackIcon={<></>}
      />
      <span>{value}</span>
      {isParticipant ? (
        <>
          <Button corner="rounded" onPress={() => onRemove()}>
            Remove
          </Button>
        </>
      ) : (
        <>
          <Button corner="rounded" onPress={() => onAdd("viewer")}>
            Add
          </Button>
        </>
      )}
    </>
  )
}

export default Participant
