"use client"

import { WithLocale, t } from "@/i18n-config"
import { FilteredList, IconRenderer } from "../widgets"
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
import { Button, Dialog } from "@/components/ui"
import { isValidEmailAddress } from "@/utils"
import { useMediaQuery } from "react-responsive"
import Participant from "../widgets/Participant"

type ParticipantsProps = WithLocale & {
  participants: WalletConstructor["participants"]
  setParticipants: Dispatch<SetStateAction<WalletConstructor["participants"]>>
}

type Participant = FilterableItem &
  NonNullable<WalletConstructor["participants"]>[number]

const Participants = ({
  currentLocale,
  participants,
  setParticipants,
}: ParticipantsProps) => {
  const [fetchedUsers, setFetchedUsers] = useState<Array<FilterableItem>>([])
  const [participantKeyword, setParticipantKeyword] = useState("")
  const [userKeyword, setUserKeyword] = useState("")
  const [fetching, setFetching] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const alternativeLayout = useMediaQuery({ maxWidth: 449 })

  const displayParticipants: Array<Participant> = useMemo(() => {
    if (!participants?.length) return []
    return participants.map((p) => ({
      ...p,
      value: p.email,
      display_name: `${p.email} (${p.role})`,
    }))
  }, [participants])

  /* const displayFetchedUsers: Array<FilterableItem> = useMemo(() => {
    if (!fetchedUsers?.length) return []
    return fetchedUsers.map((p) => ({
      ...p,
      value: p.email,
      display_name: `${p.email} (${p.role})`,
    }))
  }, [fetchedUsers]) */

  const fetchData = async () => {
    if (!isValidEmailAddress(userKeyword) || fetching) return
    console.log(userKeyword)
    /* setFetching(true)
    const [data, error] = await searchUsersByEmail(userKeyword)
    if (data) {
      setFetchedUsers(
        data.map((user) => ({
          value: user.email,
          image: user.image,
          display_name: user.email,
        }))
      )
    }
    setFetching(false) */
  }

  useEffect(() => {
    console.log(fetchedUsers)
  }, [fetchedUsers])

  return (
    <>
      <FilteredList<Participant>
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
            <Button
              className={className}
              theme="none"
              onPress={() =>
                dialogRef?.current && dialogRef.current.showModal()
              }
            >
              <FaPlus size={24} style={{ margin: "auto" }} />
            </Button>
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
          height={alternativeLayout ? 100 : 75}
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
