import StateManager from "react-select";
import { getId } from "../helpers";

const exercises = [
  {
    id: 0,
    name: "Pushup",
    duration: 400,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSDxUPEhIVFRUVFRUVFRUVFxUWFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OFQ8PFy0dHR0tLS0rLS0tLS0rKystLS0rLS0tKy0tLS0tKy0tLSstLSsrLS0tKy0tLSstLS0rLS0tK//AABEIAJ8BPgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIGAwQFBwj/xABDEAACAQICBQkFBAkDBQEAAAABAgADEQQSBQYhMUETUVJhcYGRktEUIlOhsQcWMsEjQmJyk6LS8PEVgsJjg7Lh4lT/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQEAAgIDAQEBAAAAAAAAAAABAhEhMQMSUUEyE//aAAwDAQACEQMRAD8A9whCEqiKEIChHFAUIRSghCEIIoQMqiEULwJQihAcIoxCCOKOQOMSMcKccQhIHCEJEOEIQCEIQCEIQCEIQCEIQCEIQCEIQFCEUqiEIoBFHFKCKEIQQigTKCKEIUQihKHHFeKQShFCBKEQjhDjkY5FOORjkEoRRwCOKEiHCEIBCEIBCEIBCEIBCEIBCEIEYQilUQhFKKrrxrX7Gq0qQzV6n4b7lG33jz7jslIr6RxNYXqV6h6gxUDsVbCauvuKz6ZqLe+TILc1qafmzTdwldMu02nHK3brjjwy4LFYmiQ1KrU/dYllPUVa4l/0Dp4V0AdeTq8UO4nnQ8R1b/rKXh8UmUtcWUkbOBBIN+baLSRx+20kzsavjek3nL03rDhsIpavWVSNyXvUa+6yDb+U8+1k1qxVChZKpBc5AdhKixJYE7QbCw7ZoapYAFBiagDO21SbkqO/9Y7yd86f6T125+l9tM2lvtDxdZycKGpUxuy0uUcjnZiCB2AbOczjHXHGObNjKwPG1kt5RPQcPRnO1i1eTE0zYAVQLo/G/RbnBmZ5ueYuXi+Vw9Ga3Yyl73L8svRqe+D3/iHjL1oLXahXstX9DUPBvwHsfcOw2754nTqldh2EGxH1Bmz7Qd4PdO7ht9FwnjGgde8ThwtO4qUxsCvvA5gw2jvuJe9H/aDhKlMs5akQLlSC1+cKV3ntAhra2RiaOi9L0cQuei4bnG5h2qdom7aFO8YMwV8QiC7uqjnZgo+cjQxtJzZKqMeZXVj8jINqEjGDCJRyMJBMGEiDHIqUIhHAI4oSIcIQgEIQgEIQgEIQgEIQgQhI3hNKcUV4XlHk2veiMukqlXKQKqI6twzqArC/cPNOUi5uHbPZ8VhkqLlqIrDmYX3yj6e1Gqkn2OoiKQTapmLBhuVTY7Dznd1zllhe47YZzWqq9UIaZSwDFSt7X2MLHuhgqwpqlMtchQLnZewmDEipTsK6ZHHulb7c1r7uzbzThaTc2JBnLTtt3daaQq4fYRmT3wLi5ABDDtsfECb1LE5cqJcAbLcb8ZDUnU6rjMIuJbECmrs4C8nnJCsVvfMOIPhNHC1Ty5zC1iBb8uo75r1v65XKb4X7RRLJcjs33PXtmzlsZiwVW6gjcReYdO40UkV2IAJsSZzbeY67UBTx9ULuYq/e6hj8yZxqb8OI3dkyawaVFfFVKwOwkBf3VAUeNr985j4qzIee9+w7J68bxHjy7rferazjnsR/fESTVLHYdhPzmBtjfsmx75iQ32jpH6TW0dGtW90G5BG438e6bB1hxAOVK9RQA2azsAbknaL7b3E4mLq2TZxNieobYla5ZeJb8z+Vo2Nqri2a5J4Gc+lUIII2EbjzTO5G4brf5M1wJFi96q/aLicOQlVjXpdFzdwP2ah29xuJ7LoXS9LFURWotdTsI/WU9FhwM+Y6Zlm1S1jqYOsKiG4Ox0P4XXmPMeY8IV9Cxzl6D03RxdPlKLX6SH8aHmYfnuM6UqpiORBjmUSjkYXhU7wkY5A45GOQOEUIQ4QhAIQhAIQhA188WeVw6Rq9L5L6Rf6lV6XyX0mtqseeGeVz/UqvS+Q9Iv8AUavT+S+kbFjzwzyue31en8l9IHH1en8h6RsdnE4KlUbNUpI5KlCWUNdCblTfhsnF05qdhMStjT5I7LvSCqxAFspuCLWHNF7dV6fyWM4yt0/p6SXS7rtYDDJRpJRprlSmoVRzADn4nrnnetWiiuJIUWzFn6irHN4g7O6Wf26r0z8vSaOlQ1RMxNylyN27iPl8pnPmcLjeeWHR1RgADbYANnpFrfhVraPqZgDkHKbeGUG58LyGCedSmodGRtzAqR1EWM4R6bOHzq1TKbXuLmDG6q3NslhwGprVaww/K5WsxzZcw92/C45pqaf1crYFgtWzI492ol8l+Km42N1HeN17G3oleOzTHhquZMvEboYRrXmhTbKQeH92M2xU23mtsseLbcnOb9gEzZcoY22szDuve/hlHfNWoL1L9U2cQ24cFH12n8vCBG/998GmvWq7h3+H+ZIOCIVlQzOjTSR9u+Z1aFdfR2lalFxUpuyMNzKbH/HVPT9WPtKV7U8WAp3Cqo90/vqPw9o2dQnjyvMivLtH07SrhlDKQykXBBuCDxBG8SeeeA6ua11sKcodjTJuUzEDrItuPX9Z6VonT64lb06rXtcoWYMO0X2jrGyFXXlI88q/tFTpt5m9YxiKnTfzH1kFozx55V/aH+I3mMPaX6beY+sqrQHjDGVb2h+m/mPrGK79NvM0C0loBpV+XqdNvMYcu/TbzGRFpvHeVda79NvEyXKv028TGlWa8d5WOUbpHxPrFyrdJvExpFovC8q/KNznxMYduc+JjQ0bxXiEZEileAhsgEvAd4w0i9O0xwM+eQZpGF4Eh3yNYXUjqP0heJxstA4+CfbO1yllzdRPgJwMO1u6dbE1RyDHmVvmCJ5Y9lVHVL3sWzE7VRvFm3+H1lvxOHSohp1FDqwsVYAg90qerFK2McjoH/jLfaejHp5c+1O0j9neHa/Iu9I8x/SJ4H3v5pXMdqJjKf4AlUcMjAG3WHt8iZ6qIWmmHilfVzGrvwtXuXN/43mhiMBiBtejVH71NwL94nvWUw2waeH6uaK5bG0adVHyMxD7GGwq1tvDbbbNzWTVOvhHYhWqURtFUC4C/wDUt+Ejn3ceoezi/XCB875plp1J6zpvUPC1yXQGg52k07ZCeumdnhaUvSuoOLo7aYWuvOmxu9G/ImBw0qTIDzTSro9NstRWQ8zgqfAydOuOeVG2rzZo4plIKkgjaCNhHYRunNesOeJcUI2LtorXatT912FQcz7+5xt8bzrUftAJNjhvLVB+RWeZvWHPNvDUDsZ2FNec7WI/ZTefkOuLZFenU9fKAbLVpVqZ61Bt3XB+UsGjdLUa4vSqK3ONzDtU7RPIKmlByYo01IQG4aocz93BB1DxMjRrlWDAlWG0MhykeETnse33heeeYLW7E0UVqyrWpsLqwZQ9gbG4XmIttHfLNorWzC17AVMjdGpZT3HcfGB3gTHEDHeA79ckDEDAmBkBikQYi0oybYXmPOZINA08sYExZo5FZjaRJ65C8Wz+zAke2RtFC8gIrxwEBZoiYRNugcQr7ubiOb6ETeb3qDX6M59CpbZOrQp5ktxIInlj2fis6Ge2OUdJWB6thIPytLhaUXQLE49Oxvkpl6yz0Y9PN5OzhljtFeaczERMLwCwEGjLGPLFlgK5gDDLDLAhVphhlZQw5mAI8DONitU8FUBDYWmL8UBpnxS07hSILApmI+zXCsbpUrJ1XRl8Ct/nOBjPs0xSn9HUpVBzksjeUgj5z1QIZMKYHjB1Q0hS3Ya/7atSY93vXHhecbF4GtTe1ZGRj8X3Sev3t8+gcsxYjDJUXJUVXU71YBlPcZNfB4Rh8RTQ+/8ApOpSVXva1z3eM6GIxq1aQcKqNTOUhBYFDtU9oNweJuJ6FpH7PsFVuVRqJPGk1h5Guo7gJwK32Z1EJNHEqwIIy1FKEg8Cy37d3CSz9HD0ZiQ9N8O28/pKJ4iqBtXsdRbtVZp8oDvHeNh/9zfq6jaRpHMiK9iCCtROG0EBiJztL4LE0WNSrh6iKfeJKnKp4jOPd39csuqOrojS1eiyiliCi3AIbaoBO05TcbBzbZ7HiMSiUmqkkBUNQ3B2qBe4ng2gxy9dKQFwxGa3QG1j4XnvuH0rSrJk2C4tlYe6Ra1iObhJnl8dPHjve1Iwf2iI7gHDuATa4cMR/tsPrLXo3StHEBuSfNlNm2EEHsI/u08b0uppYp02Ah3vkAABDtsW3AWsOyWrUrSjI6UUCtyrMXvcMALbQe/m4TW+NsWaunouaSkbQlQ7SQEhaOBzw0lmmIsIBoVkLxXkM0C0CcYaYS0WaQZi0LzCGgXgZhHlmAVYGtA4uJGWsy9dx2HbO1o99tpydLuC6tsvYg2+X5zawVcAE8y3+V/ynCzVenG7xV7VKlmxrtwSm3iWA+l5djKpqULJVq8WcKOxRf6sfCWXlx/idcenDPtltC0w+0QFS80yy3jBkAZNH4WhDt2x5YGqJBq4gZLSJMgaojUiASQAkgBGAIEQJOTVRJZIGO0VpmyxZIGK0kFmTJGEgY8sVplyRilKKnp3QNLMa1CmtOuFJJUBQwO7lCOJK2B3+GygYjXCpcrRGX9u+3tA3fWezVcArMGZbkW4m3unMt1vY2O0XGw7Z4NrThkpY+ulPKEFR8oXcLm+UW2C193DdM3GdtTKziNV3Zzcm54mXb7O6JqYkHhSBZm5ydiDqG890qmhsG9eoKVNbsfADixPADnns+qmgVwlHINrMbu3SO7uG+wi3n1JL/TrAyWaMrALNMleIzJlhlEDkGnDJGSeaRzHmhQFkskATzRVKwUEtsAFyTuAgYcbVWkhqMdg8SeAHXKTitJ1XctnZb7gpIAHAbPrM2mtLGs+wEIv4Rz/ALR65z+V6oGQ46p8Wp5m9YHGVPiv5m9Zhar1R07scoBJO4CBkGkKg3vUPVnYfOY9I6cq2y0kLW/Wc/QXJPeZ1MLoYkAuQo5tl50V0Gu4KO05vrMZWOuGOX4rugMVVfMazDNfYoFrLz3vtve1urrlgxNYpha7jfyZA7W90fMzLS0Pt92mt+cce+aOn62SjyNiCWFx1Db9bTnJut3cx5VnB45woW7C3AEgeF5vLpB+nU8zes1VHVJqDzTs87ZGkanxH8zesX+o1fiP5j6yCpMiqJUY3xNRthdvEmY0Rgb5jNsESWYQMaYioP128TMi4l+m3maFxJL2QD2p+m3mb1i9tbpv5m9ZO3VFlECJx7dNvM0j7c3TbzNJlBFkEBe2t028WjGNPxH8zQyCIoOaBL25viP5m9Yvbm+K/mb1kDT6hImj1QMvt7/EfzN6yLY6p8VvM3rMZodURoQMwx9X4jedpMaRrAfjfzN6zUOH5jI8i3SgZMVpbEtZadWx/WzVCptwtc/3aVPS+GyNYurOSS1jm2mxuW3XNzuM7eNpMVKttuLAjeDz2O8es5J0a3Fl/nvbymZtu11wuP2aUFpUXxLfrEjrCIdo72vs/ZE320lVL5w7A3zWzG173ta+7qlc0XTFNbLe7fiO4Hdb3e7ebmdJWMmOOrb9ayy3JPj03R+JFWktQcRtHMdxHjNi0qGp2NIZqDbm95f3h+Id42/7ZbQZthO0YWNGElfqgcfLDLMlpEiRUck5Gn9HVqwVadREXaWDKxueG4jZOxImBUPutX+NS8jf1RNqtiOFel/Db+uXC8UCpLqpiPjUv4bf1w+6le4PL0gQbgim9wRtBHvy3CBMCrtorGqLDE079IUrv4lpppoTGK2b2s361JHlLWlyJ2yLTOo17X6qnsuNUW9rH8Mes062iK7tmeurHdcqf6pa8YNk08snRvavpoKudgqU+9G/qmwurWI6dLyv6zuYffOlTM1Kyqf3ZxHSpfzwGrOI6VL+b0lwvEGgVE6t4np0x3t6QGreJ+JT8W9Jby0d4FP+7mJ6VLxb0jGruJ6dL+eW25jgVL7uYjp0vB4xqziPiUvK3rLbJKYFS+6+I+LS8r+si2q2K4VqX8Nj/wA5cJK8ClHVbGf/AKKX8L/7kqeq2L416R/7RH0eXQGPNAp33UxPxaXlcf8AKB1VxHxKXg3rLjnizQKd918R8Sl4NENVsT06X80uQMlGxS/upienS/m9IjqpielS8W9JdryMooz6qYji1Lxb0mu2rNXnp+LekvlYzQYbZNir0dWa19jU/F/SbiarYnnpeZ/6ZZMPOpQtEFQweruKSorg0rqQd7cN/wCrLrlEISh7pMPMFQGRUyj/2Q==",
    description:
      "Ausgangsposition des Liegestützes ist die Bauchlage, der Körper ist gestreckt. Die Hände befinden sich etwas über schulterbreit voneinander entfernt am Boden. Die Finger zeigen nach vorne, die Daumen nach innen. Durch gleichzeitiges Anspannen der Arme werden diese gestreckt und der Oberkörper hebt vom Boden ab. Das Gewicht wird gleichmäßig auf Zehenspitzen und Händen verteilt. Kopf, Hals, Wirbelsäule, Gesäß und Knie bilden eine Linie und die Bauchmuskulatur ist angespannt. Nun werden beide Arme gleichzeitig gebeugt und der Oberkörper somit abgesenkt, bis die Nasenspitze fast den Boden berührt. Der Körper bleibt dabei gestreckt."
  },
  { id: 1, name: "Situps", duration: 4 },
  { id: 2, name: "Squats", duration: 6 },
  { id: 3, name: "Bent-Over Row", duration: 4 },
  { id: 4, name: "Abdominal Crunches", duration: 5 }
];

const workouts = [
  {
    id: 1,
    title: "First Workout",
    exercises: [0, 1] //IDs der Übungen
  },
  {
    id: 2,
    title: "Second Workout",
    exercises: [2, 3]
  }
];

const history = {
  lastWorkouts: [
    { title: "EXAMPLE1Workout", date: new Date(2019, 10, 27) },
    { title: "EXAMPLE2Workout", date: new Date(2019, 11, 29) },
    { title: "EXAMPLE2Workout", date: new Date(2019, 11, 30) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) },
    { title: "EXAMPLE2Workout", date: new Date(2020, 0, 1) }
  ],
  totalTrainingTime: 20,
  weight: [
    { date: new Date(2019, 11, 29), weight: 70 },
    { date: new Date(2019, 11, 30), weight: 71 },
    { date: new Date(2019, 11, 31), weight: 70.7 },
    { date: new Date(2020, 0, 1), weight: 71.2 }
  ]
};

export default (
  userData = {
    workouts,
    exercises,
    history
  },
  action
) => {
  //Muss hier initialisiert werden, damit Variablenname mehrfach verwendet werden kann
  let workout;
  switch (action.type) {
    case "PUSH_WORKOUT_HISTORY":
      return {
        ...userData,
        history: {
          ...userData.history,
          lastWorkouts: [
            ...userData.history.lastWorkouts,
            { date: new Date(), title: action.payload.title }
          ]
        }
      };
    case "ADD_TIME":
      return {
        ...userData,
        history: {
          ...userData.history,
          totalTrainingTime: userData.history.totalTrainingTime + action.payload
        }
      };
    case "ADD_WEIGHT":
      return {
        ...userData,
        history: {
          ...userData.history,
          weight: [
            ...userData.history.weight,
            { date: new Date(), weight: action.payload }
          ]
        }
      };
    case "EDIT_EXERCISE":
      console.log(action.payload);

      //Die Übung mit der ID action.payload.id wird entfernt und die bearbeitete dann wieder hinzugefügt
      return {
        ...userData,
        exercises: [
          ...userData.exercises.filter(ex => ex.id !== action.payload.id),
          { ...action.payload.exercise, id: action.payload.id }
        ]
      };
    case "ADD_WORKOUT":
      return {
        ...userData,
        workouts: [
          ...userData.workouts,
          { id: getId(userData.workouts), title: action.payload, exercises: [] }
        ]
      };
    case "ADD_EXERCISE_TO_WORKOUT":
      workout = userData.workouts.find(w => w.id === action.payload.workoutId);
      workout = {
        ...workout,
        exercises: [...workout.exercises, action.payload.exerciseId]
      };
      if (!workout) {
        return userData;
      }
      return {
        ...userData,
        workouts: [
          ...workouts.filter(w => w.id !== action.payload.workoutId),
          workout
        ]
      };
    case "REMOVE_EXERCISE_FROM_WORKOUT":
      console.log(action.payload);
      workout = userData.workouts.find(w => w.id === action.payload.workoutId);
      console.log(workout);
      workout = {
        ...workout,
        exercises: workout.exercises.filter(exercise => {
          console.log(exercise);
          return exercise !== action.payload.exerciseId;
        })
      };
      console.log(workout);
      return {
        ...userData,
        workouts: [
          ...userData.workouts.filter(w => w.id !== action.payload.workoutId),
          workout
        ]
      };
    case "ADD_EXERCISE":
      return {
        ...userData,
        exercises: [
          ...userData.exercises,
          { id: getId(userData.exercises), title: action.payload, duration: 0 }
        ]
      };
    default:
      return userData;
  }
};
