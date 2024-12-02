import 'dotenv/config';

class Helpers {
  getBaseUrl() {
    const url = process.env.URL;

    if (!url) {
      throw new Error('The URL environment variable is required');
    }

    return url;
  }

  capitalize(string: string) {
    const capitalizedString =
      String(string).charAt(0).toUpperCase() + String(string).slice(1);
    return capitalizedString;
  }

  emailGenerator() {
    const date = new Date();
    const formatedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = (Math.random() + 1).toString(36).substring(6);
    const email = `gbtest${formatedDate}${random}@yopmail.com`;
    return email;
  }
}

export default Helpers;
