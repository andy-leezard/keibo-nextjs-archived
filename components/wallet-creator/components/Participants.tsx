"use client"

import { WithLocale } from "@/i18n-config"
import { FilteredList } from "../widgets"
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { FilterableItem } from "../type"
import { FaPlus } from "react-icons/fa"
import { Dialog } from "@/components/ui"
import { isValidEmailAddress } from "@/utils"
import Participant from "../widgets/Participant"
import cn from "classnames"

type ParticipantsProps = WithLocale & {
  participants: Array<TParticipant>
  setParticipants: Dispatch<SetStateAction<WalletConstructor["participants"]>>
}

type TParticipant = {
  email: string
  first_name: string
  id: number
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_name: string
}

type TDisplayParticipant = FilterableItem & {}

const Participants = ({
  currentLocale,
  participants,
  setParticipants,
}: ParticipantsProps) => {
  const [fetchedUsers, setFetchedUsers] = useState<Array<TDisplayParticipant>>(
    []
  )
  const [participantKeyword, setParticipantKeyword] = useState("")
  const [userKeyword, setUserKeyword] = useState("")
  const [fetching, setFetching] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const displayParticipants: Array<TDisplayParticipant> = useMemo(() => {
    if (!participants?.length) return []
    return participants.map((p) => ({
      value: p.email,
      display_name: `${p.email}`,
    }))
  }, [participants])

  const fetchData = async () => {
    if (!isValidEmailAddress(userKeyword) || fetching) return
    setFetching(true)
    try {
      const fetchURL = `${
        process.env.NEXT_PUBLIC_HOST ?? 8000
      }/api/search_users/${userKeyword}`
      console.log(fetchURL)
      const response = await fetch(fetchURL, {
        credentials: "include",
        method: "GET",
      })
      /* if (!response.ok) {
        throw new Error("Network response was not ok")
      } */
      const fetched_users = await response.json()
      setFetchedUsers(fetched_users)
    } catch (error) {
      console.error(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    console.log(fetchedUsers)
  }, [fetchedUsers])

  return (
    <>
      <FilteredList<TDisplayParticipant>
        currentLocale={currentLocale}
        data={displayParticipants}
        height={200}
        label={{
          en: "Participants",
          ko: "공동 이용자",
        }}
        setKeyword={setParticipantKeyword}
        customElement={(className) => {
          return (
            <button
              type="button"
              className={cn(className, "m-auto")}
              onClick={() =>
                dialogRef?.current && dialogRef.current.showModal()
              }
            >
              <FaPlus size={24} style={{ margin: "auto" }} />
            </button>
          )
        }}
        renderItem={(props) => (
          <Participant
            {...props}
            isParticipant={true}
            onAdd={(role) =>
              setParticipants((prev) => [...prev, { email: props.value, role }])
            }
            onRemove={() =>
              setParticipants((prev) =>
                prev.filter((p) => p.email !== props.value)
              )
            }
          />
        )}
      />
      <Dialog
        currentLocale={currentLocale}
        ref={dialogRef}
        /* onClose={() => {
          console.log("on close")
          setUserKeyword("")
        }} */
      >
        <FilteredList<FilterableItem>
          currentLocale={currentLocale}
          data={fetchedUsers}
          height={100}
          maxWidth={600}
          onSearch={fetchData}
          searchFormat="email"
          label={{
            en: "Search any user by email address",
            ko: "유저 이메일 검색",
          }}
          setKeyword={setUserKeyword}
          renderItem={(props) => (
            <Participant
              {...props}
              isParticipant={Boolean(
                participants?.find((p) => p.email === props.value)
              )}
              onAdd={(role) =>
                setParticipants((prev) => [
                  ...prev,
                  { email: props.value, role },
                ])
              }
              onRemove={() =>
                setParticipants((prev) =>
                  prev.filter((p) => p.email !== props.value)
                )
              }
            />
          )}
        />
      </Dialog>
    </>
  )
}

export default Participants
