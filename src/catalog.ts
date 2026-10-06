const B = import.meta.env.BASE_URL;
export type ProductCategory = 'Prawn Category' | 'Fish Category' | 'Other Seafood & Frozen Products';
export type Product = { id: string; name: string; price: number; category: ProductCategory; image: string; images: string[] };

const photos = {
  prawns: `${B}images/vivi-vannamei-prawns.jpg`,
  fish: 'https://images.pexels.com/photos/3296398/pexels-photo-3296398.jpeg?auto=compress&cs=tinysrgb&w=900',
  squidIqf: `${B}images/vivi-squid-iqf.jpg`,
  squidTubes: `${B}images/vivi-squid-tubes.jpg`,
  octopus: `${B}images/vivi-octopus.jpg`,
  crabClaws: `${B}images/vivi-crab-claws.jpg`,
  crabMeat: `${B}images/vivi-raw-crab-meat.jpg`,
  shellCrab: `${B}images/vivi-shell-crab.jpg`,
  cutCrab: `${B}images/vivi-cut-crab.jpg`,
  crabSticks: `${B}images/vivi-crab-sticks.jpg`,
  salmon: 'https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=900',
};
const prawnLabel: Record<string,string> = {'21/25':'Extra Large','26/30':'Extra Large','31/40':'Large','41/50':'Large','51/60':'Medium','61/70':'Medium','71/90':'Medium','91/110':'Small','100/120':'Small','100/200':'Extra Small','200/300':'Extra Small','300/500':'Extra Small'};
const gallery: Record<string,string[]> = {
  "Squid IQF": [
    `${B}images/products/squid-iqf-1.jpg`,
    `${B}images/products/squid-iqf-2.jpg`
  ],
  "Squid Tubes": [
    `${B}images/products/squid-tubes-1.jpg`,
    `${B}images/products/squid-tubes-2.jpg`
  ],
  "Octopus": [
    `${B}images/products/octopus-1.jpg`
  ],
  "Crab Claw": [
    `${B}images/products/crab-claw-1.jpg`
  ],
  "Raw Crab Meat": [
    `${B}images/products/raw-crab-meat-1.jpg`,
    `${B}images/products/raw-crab-meat-2.jpg`
  ],
  "Shell Crab": [
    `${B}images/products/shell-crab-1.jpg`
  ],
  "Cut Crab": [
    `${B}images/products/cut-crab-1.jpg`
  ],
  "Crab Sticks": [
    `${B}images/products/crab-sticks-1.jpg`,
    `${B}images/products/crab-sticks-2.jpg`
  ],
  "Fish Fingers": [
    `${B}images/products/fish-fingers-1.jpg`,
    `${B}images/products/fish-fingers-2.jpg`
  ],
  "Raw Salmon": [
    `${B}images/products/raw-salmon-1.jpg`,
    `${B}images/products/raw-salmon-2.jpg`,
    `${B}images/products/raw-salmon-3.jpg`
  ],
  "Tuna": [
    `${B}images/products/tuna-1.jpg`,
    `${B}images/products/tuna-2.jpg`
  ],
  "Nethili": [
    `${B}images/products/nethili-1.jpg`,
    `${B}images/products/nethili-2.jpg`
  ],
  "Black Pomfret": [
    `${B}images/products/black-pomfret-1.jpg`,
    `${B}images/products/black-pomfret-2.jpg`
  ],
  "Tilapia": [
    `${B}images/products/tilapia-1.jpg`,
    `${B}images/products/tilapia-2.jpg`
  ],
  "Mahi-Mahi / Parla": [
    `${B}images/products/mahi-mahi-1.jpg`,
    `${B}images/products/mahi-mahi-2.jpg`,
    `${B}images/products/mahi-mahi-3.jpg`
  ],
  "Sardine / Mathi": [
    `${B}images/products/sardine-mathi-1.jpg`,
    `${B}images/products/sardine-mathi-2.jpg`
  ],
  "Seer Fish": [
    `${B}images/products/seer-fish-1.jpg`,
    `${B}images/products/seer-fish-2.jpg`
  ]
};
const entries: Array<[ProductCategory, string, number, string]> = [
  ...[['21/25',750],['26/30',680],['31/40',620],['41/50',580],['51/60',550],['61/70',540],['71/90',530],['91/110',520],['100/120',510],['100/200',400],['200/300',350],['300/500',330]].map(([size,price])=>['Prawn Category',`Vannamei Prawns – ${size} ${prawnLabel[String(size)]}`,Number(price),'prawns'] as [ProductCategory,string,number,string]),
  ...[['BASA White',350,'fish'],['BASA Pink',320,'fish'],['Indian Basa',440,'fish'],['Nethili',380,'fish'],['Tilapia',290,'fish'],['Mahi-Mahi / Parla',540,'fish'],['Sardine / Mathi',240,'fish'],['Seer Fish',1050,'fish'],['Black Pomfret',675,'fish']].map(([name,price,image])=>['Fish Category',String(name),Number(price),String(image)] as [ProductCategory,string,number,string]),
  ...[['Squid IQF',480,'squidIqf'],['Squid Tubes',440,'squidTubes'],['Octopus',260,'octopus'],['Crab Claw',680,'crabClaws'],['Raw Crab Meat',720,'crabMeat'],['Shell Crab',450,'shellCrab'],['Cut Crab',450,'cutCrab'],['Crab Sticks',685,'crabSticks'],['Fish Fingers',745,'fish'],['Raw Salmon',2425,'salmon'],['Smoked Salmon',2900,'salmon'],['Tuna',2640,'fish'],['Salmon',2800,'salmon']].map(([name,price,image])=>['Other Seafood & Frozen Products',String(name),Number(price),String(image)] as [ProductCategory,string,number,string]),
];
export const products: Product[] = entries.map(([category,name,price,photo],i)=>({
  id:`vivi-${i+1}`, category, name, price,
  image: photos[photo as keyof typeof photos],
  images: gallery[name] ?? [photos[photo as keyof typeof photos]],
}));
export const categories: ProductCategory[] = ['Prawn Category','Fish Category','Other Seafood & Frozen Products'];