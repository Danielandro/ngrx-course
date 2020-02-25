
export interface Course {
  id: number;
  seqNo: number;
  url: string;
  iconUrl: string;
  courseListIcon: string;
  description: string;
  longDescription?: string;
  category: string;
  lessonsCount: number;
  promo: boolean;
}


export function compareCourses(c1: Course, c2: Course) {

  const compare = c1.seqNo - c2.seqNo;

  // c1 comes before c2
  if (compare > 0) {
    return 1;
  }

  // c2 comes before c1
  else if (compare < 0) {
    return -1;
  }

  // c1 + c2 have same seqNo
  else return 0;

}
