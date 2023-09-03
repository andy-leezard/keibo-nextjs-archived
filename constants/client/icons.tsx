import { IconBaseProps } from "react-icons"
import { MdCurrencyFranc } from "react-icons/md"
import { IoLogoEuro, IoLogoUsd, IoLogoYen } from "react-icons/io"
import { BiPound, BiRuble, BiWon } from "react-icons/bi"
import { TbCoinRupee } from "react-icons/tb"
import { BsBank2, BsCashStack, BsPiggyBankFill } from "react-icons/bs"
import { AiOutlineStock } from "react-icons/ai"
import { FaBitcoin } from "react-icons/fa"

export const fiatIconMap: Map<
  string /* FiatCurrency */,
  (props?: IconBaseProps) => JSX.Element
> = new Map([
  ["usd", (props) => <IoLogoUsd {...props} />],
  ["eur", (props) => <IoLogoEuro {...props} />],
  ["chf", (props) => <MdCurrencyFranc {...props} />],
  ["gbp", (props) => <BiPound {...props} />],
  ["jpy", (props) => <IoLogoYen {...props} />],
  ["rub", (props) => <BiRuble {...props} />],
  ["krw", (props) => <BiWon {...props} />],
  ["cny", (props) => <IoLogoYen {...props} />],
  ["cad", (props) => <IoLogoUsd {...props} />],
  ["inr", (props) => <TbCoinRupee {...props} />],
])

export const assetCategoryIconMap: Map<
  AssetCategory,
  (props?: IconBaseProps) => JSX.Element
> = new Map([
  ["cash", (props) => <BsCashStack {...props} />],
  ["equity", (props) => <AiOutlineStock {...props} />],
  ["crypto", (props) => <FaBitcoin {...props} />],
  ["fund", (props) => <BsBank2 {...props} />],
  ["other", (props) => <BsPiggyBankFill {...props} />],
])
