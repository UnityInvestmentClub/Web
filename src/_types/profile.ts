export type Profile = {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  joinDate: string,
  address: string,
  city: string,
  state: string,
  zipcode: string
};

export type ProfileDTO = {
  id: string
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  join_date: Date,
  address: string,
  city: string,
  state: string,
  zipcode: string
};

export type ProfileFormField = 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'joinDate' | 'address' | 'city' | 'state' | 'zipcode';