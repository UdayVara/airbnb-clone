import { IconType } from "react-icons";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

type category = {
    icon : IconType,
    label : string,
    description:string,
    isSelected:boolean
}

export const availableCategories: category[] = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
        isSelected:false
      },
      {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
        isSelected:false
      },
      {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!',
        isSelected:false
      },
      {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!',
        isSelected:false
      },
      {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!',
        isSelected:false
      },
      {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!',
        isSelected:false
      },
      {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!',
        isSelected:false
      },
      {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!',
        isSelected:false
      },
      {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!',
        isSelected:false
      },
      {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!',
        isSelected:false
      },
      {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!',
        isSelected:false
      },
      {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!',
        isSelected:false
      },
      {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!',
        isSelected:false
      },
      {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!',
        isSelected:false
      },
      {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!',
        isSelected:false
      }
]