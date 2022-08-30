import { range } from "lodash";
import { Random } from "mockjs";

export interface PaginationDto<T> {
  total: number;
  size: number;
  page: number;
  list: T[];
}

export interface PetDto {
  name: string;
  birth: string;
  city: string;
}

export function getPets(size: number, page: number) {
  return new Promise<PaginationDto<PetDto>>((resolve) => {
    setTimeout(() => {
      resolve({
        total: 12498,
        size,
        page,
        list: range(0, size).map((item) => {
          return {
            name: Random.cname(),
            birth: Random.datetime(),
            city: Random.city(),
          };
        }),
      });
    }, 2000);
  });
}
